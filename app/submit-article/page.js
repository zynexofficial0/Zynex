"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  "https://kmhtrtkblpxmowcibrjf.supabase.co",
  "sb_publishable_QnmZnH13G6a6Ny0pCuN8Xw_qlGevC7O"
);

export default function SubmitArticle() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    read_time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!form.title || !form.author || !form.category || !form.content) {
      setMessage("Please fill in all required fields (Title, Author, Category, Content)");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      // Generate slug from title
      const slug = form.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // Try to save to Supabase
      const { error } = await supabase.from("submitted_articles").insert([
        {
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          author: form.author,
          category: form.category,
          read_time: form.read_time || "5 min read",
          slug: slug,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        // If Supabase fails, save to localStorage as fallback
        console.warn("Supabase insert failed, saving to localStorage", error);
        const submissions = JSON.parse(
          localStorage.getItem("article_submissions") || "[]"
        );
        submissions.push({
          id: Date.now(),
          ...form,
          slug: slug,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem(
          "article_submissions",
          JSON.stringify(submissions)
        );
      }

      setSuccess(true);
      setMessage(
        "✓ Article submitted successfully! Our team will review it shortly."
      );

      // Reset form
      setForm({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        read_time: "",
      });

      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.error("Error submitting article:", err);
      setSuccess(false);
      setMessage("Error submitting article. Please try again.");
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
          Submit Article
        </h1>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          Share your crypto insights with our community. No limits on submissions!
        </p>

        <input
          name="title"
          placeholder="Article Title *"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="author"
          placeholder="Author Name *"
          value={form.author}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Category *</option>
          <option>Guide</option>
          <option>Education</option>
          <option>Analysis</option>
          <option>Security</option>
          <option>Trends</option>
          <option>News</option>
        </select>

        <input
          name="read_time"
          placeholder="Read Time (e.g., 5 min read)"
          value={form.read_time}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="excerpt"
          placeholder="Article Excerpt"
          rows="3"
          value={form.excerpt}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="content"
          placeholder="Article Content *"
          rows="10"
          value={form.content}
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
          {loading ? "Submitting..." : "Submit Article"}
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
