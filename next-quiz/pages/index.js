import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import Button from '@mui/material/Button';

export default function Home() {
	// navbar- logo on left, login signup buttons on right
	// 
	return (
		<div className={styles.container}>
			<Button variant="contained">Hello World</Button>
			<Header />
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">
						Next.js!</a> integrated with{" "}
					<a href="https://mui.com/">Material-UI!</a>
				</h1>
				<p className={styles.description}>
					Get started by editing{" "}
					<code className={styles.code}>
						pages/index.js</code>
				</p>

			</main>
		</div>
	);
}
