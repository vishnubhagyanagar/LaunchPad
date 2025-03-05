"use client";
import { RootState } from '@/lib/store';
import React from 'react';
import { useSelector } from 'react-redux';
import InvestorProfile from './investor';
import StartupProfile from './startup';

export default function Profile() {
    const authState = useSelector((state: RootState) => state.auth);

    return (
        <>
            {authState.userType === 'Investor' && authState.user ? (
                <InvestorProfile
                    investor={{
                        email: authState.user.email,
                        fullName: authState.user.fullName,
                        phoneNumber: authState.user.phoneNumber,
                        typeOfInvestor: authState.user.typeOfInvestor,
                        location: authState.user.location,
                        sectorsOfInterest: authState.user.sectorsOfInterest,
                        stageFocus: authState.user.stageFocus,
                        preferredBusinessModels: authState.user.preferredBusinessModels,
                        following: authState.user.following || [], // Ensure this is an array
                        ticketSize: authState.user.ticketSize,
                        equityStake: authState.user.equityStake,
                        investmentHorizon: authState.user.investmentHorizon,
                        trackRecord: authState.user.trackRecord,
                        sectorExpertise: authState.user.sectorExpertise,
                        limitedPartners: authState.user.limitedPartners,
                        geoPreferences: authState.user.geoPreferences,
                        availability: authState.user.availability,
                        createdAt: authState.user.createdAt,
                    }}
                />
            ) : (
                <StartupProfile startup={{
                    companyName: authState.user?.companyName,
                    description: authState.user?.companyDescription,
                    websiteUrl: "",
                    country: "",
                    city: "",
                    sector: authState.user?.industry
                  }}/>
            )}
        </>
    );
}
