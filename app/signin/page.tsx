import { redirect } from "next/navigation";
import { auth, getProviders } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

export default async function SignInPage() {
  let session, providers, error;

  try {
    session = await auth();
    providers = await getProviders();
  } catch (err) {
    error = err.message;
  }

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Sign in to your account</h2>
        {error && <p className={styles.error}>Error: {error}</p>}
        {providers ? (
          providers.credentials ? (
            <DemoLogin />
          ) : (
            <NextAuthLogin providers={providers} />
          )
        ) : (
          <p className={styles.loading}>Loading providers...</p>
        )}
      </main>
      <aside className={styles.aside} />
    </div>
  );
}

