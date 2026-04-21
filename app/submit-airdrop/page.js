"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("airdrops").insert([form]);

    if (error) {
      setMessage("❌ Failed to submit.");
    } else {
      setMessage("✅ Airdrop submitted successfully!");
      setForm({
        project_name: "",
        website: "",
        twitter: "",
        telegram: "",
        discord: "",
        blockchain: "",
        description: "",
      });
    }

    setLoading(false);
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
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          Submit Airdrop
        </h1>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          Submit your crypto project for listing on Airdrop Hunt.
        </p>

        <input
          name="project_name"
          placeholder="Project Name"
          value={form.project_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="website"
          placeholder="Website URL"
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
          <option value="">Select Blockchain</option>
          <option>Ethereum</option>
          <option>Solana</option>
          <option>BNB Chain</option>
          <option>Base</option>
          <option>Polygon</option>
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
            background: "#22c55e",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          {loading ? "Submitting..." : "Submit Airdrop"}
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "#22c55e" }}>{message}</p>
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
};
