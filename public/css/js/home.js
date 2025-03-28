import styles from "../styles/style.module.css"; 
import { useState } from "react";

export default function Home() {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>💬 Chat AI (GPT & Blackbox)</div>
        </div>
    );
}
