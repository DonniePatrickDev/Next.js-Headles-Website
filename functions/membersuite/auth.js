export async function LoginUser(credentials) {
  const requestBody = JSON.stringify({
    ...credentials,
    clientID: process.env.MEMBERSUITE_CLIENT_ID,
  })

  const res = await fetch(
    `${process.env.MEMBERSUITE_API_URL}/authtoken/33409`,
    {
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.text()
  }
}

export async function forgotPassword(email) {
  const res = await fetch(`/api/membersuite/forgotPassword`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status !== 200) {
    return null
  } else {
    return res
  }
}

export async function confirmPassword(email, code, newPassword) {
  const res = await fetch(`/api/membersuite/resetPassword`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      code: code,
      newPassword: newPassword,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status !== 200) {
    return null
  } else {
    return res
  }
}

export async function GetUser(token) {
  const res = await fetch('https://rest.membersuite.com/platform/v2/whoami', {
    method: 'GET',
    headers: { Authorization: token },
    redirect: 'follow',
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function GetMembership(token, membershipId) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/memberships/${membershipId}`,
    {
      method: 'GET',
      headers: { Authorization: token },
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function GetMembershipType(token, membershipIdTypeId) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/membershiptypes/${membershipIdTypeId}`,
    {
      method: 'GET',
      headers: { Authorization: token },
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function GetMembershipProduct(token, membershipProductId) {
  const res = await fetch(
    `https://rest.membersuite.com/orders/v1/products/details/${membershipProductId}`,
    {
      method: 'GET',
      headers: { Authorization: token },
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function GetMembershipOrganization(
  token,
  membershipOrganizationId
) {
  const res = await fetch(
    `https://rest.membersuite.com/membership/v1/membershiporganizations/${membershipOrganizationId}`,
    {
      method: 'GET',
      headers: { Authorization: token },
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function getMembershipLevel(email) {
  const res = await fetch(
    `https://backend.dhanalytics.org/api/memberships/?email=${email}`,
    {
      method: 'GET',
      redirect: 'follow',
    }
  )

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function updateUser(token, userId, userData) {
  const res = await fetch('/api/membersuite/updateUser/', {
    method: 'PUT',
    body: JSON.stringify({
      token: token,
      userId: userId,
      userData: userData,
    }),
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}

export async function updatePassword(token, passwordData) {
  const res = await fetch('/api/membersuite/updatePassword/', {
    method: 'POST',
    body: JSON.stringify({
      token: token,
      passwordData: passwordData,
    }),
  })

  if (res.status !== 200) {
    return null
  } else {
    return await res.json()
  }
}
