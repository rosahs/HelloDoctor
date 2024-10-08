import Link from 'next/link';
import { UserDocument } from '@/models/UserModel';

const PatientDashboard = ({ user }: { user: UserDocument }) => {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      {/* Other dashboard content */}

      {/* Link to the new appointment page */}
      <Link href={`/appointments/patients/${user._id}/new-appointment`}>
        Schedule New Appointment
      </Link>
    </div>
  );
};

export default PatientDashboard;