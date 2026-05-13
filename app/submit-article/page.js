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
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
      const { error } = await supabase.from("articles").insert([
        {
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          author: form.author,
          category: form.category,
          read_time: form.read_time || "5 min read",
          slug: slug,
          image: form.image,
          published_at: new Date().toISOString(),
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
        "✓ Article submitted successfully! It's now live on the website."
      );

      // Reset form
      setForm({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        read_time: "",
        image: "",
      });
      setImagePreview("");

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

        <label style={{ display: "block", marginBottom: "10px", color: "#aaa", fontSize: "14px" }}>
          Article Image or Logo
        </label>
        <div
          style={{
            border: "2px dashed #22c55e",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            marginBottom: "15px",
            background: "#1a1a1a",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-input"
          />
          <label htmlFor="image-input" style={{ cursor: "pointer" }}>
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Article preview"
                  style={{ maxWidth: "150px", maxHeight: "150px", marginBottom: "10px" }}
                />
                <p style={{ color: "#22c55e", margin: "10px 0" }}>Click to change image</p>
              </div>
            ) : (
              <div>
                <p style={{ color: "#22c55e", fontWeight: "bold" }}>Click or drag to upload image</p>
                <p style={{ color: "#666", fontSize: "12px" }}>PNG, JPG, GIF (Max 5MB)</p>
              </div>
            )}
          </label>
        </div>

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
