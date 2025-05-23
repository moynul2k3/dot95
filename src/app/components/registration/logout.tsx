'use client';

import { getCookie, deleteCookie } from 'cookies-next/client';
import React, { useState } from "react";
//import { useRouter } from "next/navigation";

const API_URL =
	process.env.NEXT_PUBLIC_PRODUCTION === "true"
		? process.env.NEXT_PUBLIC_PRODUCTION_API
		: process.env.NEXT_PUBLIC_LOCAL_API;

export default function SigninSignup() {
	//const router = useRouter();
	const [loading, setLoading] = useState(false);

	const logOut = async () => {
		const refreshToken = getCookie("rf_T");
		setLoading(true);

		try {
			const response = await fetch(`${API_URL}/token/logout/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (response.ok) {
				['ac_T', 'rf_T', 'u_id'].forEach(cookie => deleteCookie(cookie));

				// Redirect and refresh manually
				window.location.href = "/";
				return;
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}

		setLoading(false); // Set loading to false if logout fails
	};

	return (
		<div>
			<button
				onClick={logOut}
				className={`flex justify-start items-center gap-3 group/item ${loading ? "pointer-events-none" : ""}`}
			>
				<i className='bx bx-log-out text-[20px] font-thin'></i>
				<p className="text-xs group-hover/item:underline group-hover/item:text-[#f008] font-semibold">
					{loading ? "Logging out..." : "Logout"}
				</p>
			</button>
		</div>
	);
}
