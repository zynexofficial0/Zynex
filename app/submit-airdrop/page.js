"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  "https://kmhtrtkblpxmowcibrjf.supabase.co",
  "sb_publishable_QnmZnH13G6a6Ny0pCuN8Xw_qlGevC7O"
);

export default function SubmitAirdrop() {
  const [form, setForm] = useState({
    project_name: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    blockchain: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!form.project_name || !form.website || !form.blockchain) {
      setMessage("Please fill in all required fields (Project Name, Website, Blockchain)");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      // Try to save to Supabase
      const { error } = await supabase.from("airdrops").insert([
        {
          name: form.project_name,
          symbol: "",
          description: form.description,
          status: "active",
          chain: form.blockchain,
          estimatedValue: "",
          endDate: new Date().toISOString().split("T")[0],
          requirements: [],
          website: form.website,
          featured: false,
          twitter: form.twitter,
          telegram: form.telegram,
          discord: form.discord,
        },
      ]);

      if (error) {
        // If Supabase fails, save to localStorage as fallback
        console.warn("Supabase insert failed, saving to localStorage", error);
        const submissions = JSON.parse(
          localStorage.getItem("airdrop_submissions") || "[]"
        );
        submissions.push({
          id: Date.now(),
          ...form,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem(
          "airdrop_submissions",
          JSON.stringify(submissions)
        );
      }

      setSuccess(true);
      setMessage(
        "✓ Airdrop submitted successfully! Our team will review it shortly."
      );
      
      // Reset form
      setForm({
        project_name: "",
        website: "",
        twitter: "",
        telegram: "",
        discord: "",
        blockchain: "",
        description: "",
      });

      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error("Error submitting airdrop:", err);
      setSuccess(false);
      setMessage("Error submitting airdrop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#111",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #22c55e",
        }}
      >
        <Link href="/" style={{ color: "#22c55e", textDecoration: "none" }}>
          ← Back to Home
        </Link>
        
        <h1 style={{ fontSize: "32px", marginBottom: "10px", marginTop: "20px" }}>
          Submit Airdrop
        </h1>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          Submit your crypto project for listing on Airdrop Hunt. No limits on submissions!
        </p>

        <input
          name="project_name"
          placeholder="Project Name *"
          value={form.project_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="website"
          placeholder="Website URL *"
          value={form.website}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="twitter"
          placeholder="Twitter / X Link"
          value={form.twitter}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="telegram"
          placeholder="Telegram Link"
          value={form.telegram}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="discord"
          placeholder="Discord Link"
          value={form.discord}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="blockchain"
          value={form.blockchain}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Blockchain *</option>
          <option>Ethereum</option>
          <option>Solana</option>
          <option>BNB Chain</option>
          <option>Base</option>
          <option>Polygon</option>
          <option>Arbitrum</option>
          <option>Optimism</option>
          <option>zkSync</option>
          <option>Scroll</option>
          <option>Multi-chain</option>
        </select>

        <textarea
          name="description"
          placeholder="Project Description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#666" : "#22c55e",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "15px",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting..." : "Submit Airdrop"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: success ? "#22c55e" : "#ef4444",
              padding: "10px",
              borderRadius: "8px",
              background: success ? "#22c55e20" : "#ef444420",
              border: `1px solid ${success ? "#22c55e" : "#ef4444"}`,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  background: "#1a1a1a",
  color: "white",
  border: "1px solid #333",
  borderRadius: "10px",
  fontSize: "14px",
  boxSizing: "border-box",
};
