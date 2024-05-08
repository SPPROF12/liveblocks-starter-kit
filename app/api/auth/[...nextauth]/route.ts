// Import the necessary modules
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { GET, POST } from "@/auth";

// Set the edge runtime
export const runtime = "edge";

// Define a helper function to handle the GET request
export async function GET(request) {
  // Get the session object
  const session = await getServerSession();

  // If there is no session, return an unauthorized response
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Call the GET function from the @/auth module
  const data = await GET(request, session);

  // Return the response
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Define a helper function to handle the POST request
export async function POST(request) {
  // Get the session object
  const session = await getServerSession();

  // If there is no session, return an unauthorized response
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Call the POST function from the @/auth module
  const data = await POST(request, session);

  // Return the response
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
