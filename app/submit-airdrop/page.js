export default function SubmitAirdrop() {
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

        <input placeholder="Project Name" style={inputStyle} />
        <input placeholder="Website URL" style={inputStyle} />
        <input placeholder="Twitter / X Link" style={inputStyle} />
        <input placeholder="Telegram Link" style={inputStyle} />
        <input placeholder="Discord Link" style={inputStyle} />

        <select style={inputStyle}>
          <option>Select Blockchain</option>
          <option>Ethereum</option>
          <option>Solana</option>
          <option>BNB Chain</option>
          <option>Base</option>
          <option>Polygon</option>
        </select>

        <textarea
          placeholder="Project Description"
          rows="5"
          style={inputStyle}
        />

        <button
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
          Submit Airdrop
        </button>
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
