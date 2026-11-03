import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Your web app's exact Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBmNA9CYq5MWES_MMQP87dlujmLDmb0Thg",
  authDomain: "the-everest-it.firebaseapp.com",
  projectId: "the-everest-it",
  storageBucket: "the-everest-it.firebasestorage.app",
  messagingSenderId: "963699255307",
  appId: "1:963699255307:web:5db720be6dc50011693f0e",
  measurementId: "G-ZC76DJ8FEM"
};

// Initialize Firebase App safely (singleton)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Collection References
export const SEMINAR_LEADS_COLLECTION = 'seminar_leads';
export const STUDENT_ENROLLMENTS_COLLECTION = 'student_enrollments';

export interface FirebaseSeminarLead {
  id?: string;
  ticketId: string;
  name: string;
  phone: string;
  email?: string;
  courseInterest: string;
  preferredShift: 'In-Person (Shewrapara)' | 'Online (Zoom)';
  registrationDate: string;
  status: 'New Lead' | 'Contacted' | 'Verified' | 'Converted';
  notes?: string;
  createdAt?: any;
}

export interface FirebaseEnrollment {
  id?: string;
  enrollmentId: string;
  studentName: string;
  phone: string;
  course: string;
  batch: string;
  feePaid: number;
  totalFee: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank' | 'Campus Cash';
  date: string;
  status: 'Full Paid' | 'Partial (Installment)' | 'Pending Verification';
  createdAt?: any;
}

/**
 * Add a new seminar lead to Firestore
 */
export async function addSeminarLeadToFirestore(lead: Omit<FirebaseSeminarLead, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, SEMINAR_LEADS_COLLECTION), {
      ...lead,
      createdAt: serverTimestamp(),
      createdTimeMillis: Date.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding seminar lead to Firestore:', error);
    // Non-fatal error handling: return error so UI can show graceful feedback
    return { success: false, error };
  }
}

/**
 * Subscribe to real-time changes in the seminar_leads collection
 */
export function subscribeToSeminarLeads(
  onData: (leads: FirebaseSeminarLead[]) => void,
  onError?: (error: any) => void
) {
  try {
    const q = query(collection(db, SEMINAR_LEADS_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        const leads: FirebaseSeminarLead[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ticketId: data.ticketId || `EVR-SEM-${docSnap.id.slice(0, 6).toUpperCase()}`,
            name: data.name || 'Student',
            phone: data.phone || '',
            email: data.email || '',
            courseInterest: data.courseInterest || 'General IT Counseling',
            preferredShift: data.preferredShift || 'In-Person (Shewrapara)',
            registrationDate: data.registrationDate || new Date().toLocaleDateString('en-US'),
            status: data.status || 'New Lead',
            notes: data.notes || '',
            createdAt: data.createdAt
          };
        });
        
        // Sort newest first by createdTimeMillis or ticket
        leads.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        
        onData(leads);
      },
      (error) => {
        console.warn('Firestore seminar_leads listener warning:', error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Failed to attach Firestore listener:', error);
    if (onError) onError(error);
    return () => {};
  }
}

/**
 * Update an existing seminar lead in Firestore
 */
export async function updateSeminarLeadInFirestore(docId: string, updates: Partial<FirebaseSeminarLead>) {
  try {
    const docRef = doc(db, SEMINAR_LEADS_COLLECTION, docId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating seminar lead in Firestore:', error);
    return { success: false, error };
  }
}

/**
 * Delete a seminar lead from Firestore
 */
export async function deleteSeminarLeadFromFirestore(docId: string) {
  try {
    const docRef = doc(db, SEMINAR_LEADS_COLLECTION, docId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting seminar lead from Firestore:', error);
    return { success: false, error };
  }
}

/**
 * Add a student enrollment record to Firestore
 */
export async function addEnrollmentToFirestore(enrollment: Omit<FirebaseEnrollment, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, STUDENT_ENROLLMENTS_COLLECTION), {
      ...enrollment,
      createdAt: serverTimestamp(),
      createdTimeMillis: Date.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding enrollment to Firestore:', error);
    return { success: false, error };
  }
}

/**
 * Subscribe to real-time changes in the student_enrollments collection
 */
export function subscribeToEnrollments(
  onData: (enrollments: FirebaseEnrollment[]) => void,
  onError?: (error: any) => void
) {
  try {
    const q = query(collection(db, STUDENT_ENROLLMENTS_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        const enrollments: FirebaseEnrollment[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            enrollmentId: data.enrollmentId || `ADM-${docSnap.id.slice(0, 6).toUpperCase()}`,
            studentName: data.studentName || 'Student',
            phone: data.phone || '',
            course: data.course || '',
            batch: data.batch || 'Batch 48',
            feePaid: data.feePaid || 0,
            totalFee: data.totalFee || 0,
            paymentMethod: data.paymentMethod || 'bKash',
            date: data.date || new Date().toLocaleDateString('en-US'),
            status: data.status || 'Pending Verification',
            createdAt: data.createdAt
          };
        });
        
        enrollments.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        
        onData(enrollments);
      },
      (error) => {
        console.warn('Firestore student_enrollments listener warning:', error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Failed to attach Firestore enrollments listener:', error);
    if (onError) onError(error);
    return () => {};
  }
}
