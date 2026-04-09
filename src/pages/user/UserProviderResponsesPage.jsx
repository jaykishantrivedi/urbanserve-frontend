import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetAcceptedResponsesForRequestQuery, useChooseProviderMutation, useDeclineProviderQuoteMutation } from '../../redux/providerResponseApi';
import { toast } from 'react-toastify';
import UserProviderResponsesLoadingState from './userProviderResponses/UserProviderResponsesLoadingState';
import UserProviderResponsesHeader from './userProviderResponses/UserProviderResponsesHeader';
import UserProviderResponsesEmptyState from './userProviderResponses/UserProviderResponsesEmptyState';
import UserProviderResponsesGrid from './userProviderResponses/UserProviderResponsesGrid';
import UserProviderStartOtpModal from './userProviderResponses/UserProviderStartOtpModal';

export default function UserProviderResponsesPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useGetAcceptedResponsesForRequestQuery(id);
    const [chooseProvider, { isLoading: isChoosing }] = useChooseProviderMutation();
    const [declineQuote, { isLoading: isDeclining }] = useDeclineProviderQuoteMutation();

    const [otpModal, setOtpModal] = useState(null); // { startOTP }

    // When no provider has accepted yet, API returns 404 — treat as empty list
    const responses = data?.responses || [];

    const handleAcceptQuote = async (responseId, e) => {
        e.stopPropagation();
        if(!window.confirm("Are you sure you want to select this provider? Other pending quotes will be declined.")) return;
        
        try {
            const result = await chooseProvider(responseId).unwrap();
            // Show the startOTP in a modal before navigating — it's only returned ONCE
            if (result.startOTP) {
                setOtpModal({ startOTP: result.startOTP });
            } else {
                toast.success("Provider successfully selected and booked!");
                navigate('/user/bookings');
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to book provider");
        }
    };

    const handleRejectQuote = async (responseId, e) => {
        e.stopPropagation();
        if(!window.confirm("Are you sure you want to reject this quote?")) return;
        
        try {
            await declineQuote(responseId).unwrap();
            toast.success("Quote declined.");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to decline quote");
        }
    };

    if(isLoading) {
        return <UserProviderResponsesLoadingState />
    }

    return (
        <>
        <div className="min-h-screen bg-gray-50 pt-(--height-navbar) pb-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto mt-8">
                <UserProviderResponsesHeader onBack={() => navigate('/user/requests')} />

                {responses.length === 0 ? (
                    <UserProviderResponsesEmptyState />
                ) : (
                    <UserProviderResponsesGrid
                        responses={responses}
                        isChoosing={isChoosing}
                        isDeclining={isDeclining}
                        onReject={handleRejectQuote}
                        onAccept={handleAcceptQuote}
                    />
                )}
            </div>
        </div>

        <UserProviderStartOtpModal
            otpModal={otpModal}
            onClose={() => {
                setOtpModal(null)
                navigate('/user/bookings')
            }}
        />
        </>
    )
}
