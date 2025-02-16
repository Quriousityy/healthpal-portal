
import { Card } from "@/components/ui/card";
import type { User } from "@/lib/types";

// Mock data for demonstration
const mockUser: User = {
  id: "1",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: new Date("1990-01-01"),
  contact: "+1 234 567 8900"
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-semibold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information
          </p>
        </header>

        <Card className="p-6 animate-fadeIn">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">First Name</p>
              <p className="font-medium">{mockUser.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Name</p>
              <p className="font-medium">{mockUser.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{mockUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-medium">{mockUser.contact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">
                {mockUser.dateOfBirth.toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
