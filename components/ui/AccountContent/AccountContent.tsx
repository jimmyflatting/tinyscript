'use client';

import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import LogoutForm from '@/components/ui/AccountForms/LogoutForm';

type AccountContentProps = {
  subscription: any;
  userDetails: { full_name: string } | null;
  userEmail: string;
};

export default function AccountContent({
  subscription,
  userDetails,
  userEmail
}: AccountContentProps) {
  return (
    <div className="p-4">
      <CustomerPortalForm subscription={subscription} />
      <NameForm userName={userDetails?.full_name ?? ''} />
      <EmailForm userEmail={userEmail} />
      <LogoutForm />
    </div>
  );
}
