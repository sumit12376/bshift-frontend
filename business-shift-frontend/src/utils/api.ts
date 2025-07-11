 export const customSignup = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/employee/create`, {
    method: 'POST',
    body: formData, 
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Signup failed');
  }

  return res.json();
};
