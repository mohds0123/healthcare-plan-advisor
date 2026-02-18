import { useState } from "react";
import axios from "axios";

function App() {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [dependents, setDependents] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [disease, setDisease] = useState(false);

  const [result, setResult] = useState(null);
  const [question, setQuestion] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [error, setError] = useState("");

  const [loadingRecommend, setLoadingRecommend] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  // ===============================
  // GET RECOMMENDATION
  // ===============================
  const getRecommendation = async () => {
    try {
      setLoadingRecommend(true);
      setError("");
      setResult(null);

      const res = await axios.post("http://127.0.0.1:8000/recommend/", {
        age: Number(age),
        income: Number(income),
        dependents: Number(dependents),
        smoker: smoker,
        disease: disease,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to get recommendation. Check backend.");
    } finally {
      setLoadingRecommend(false);
    }
  };

  // ===============================
  // ASK AI
  // ===============================
  const askAI = async () => {
    try {
      setLoadingAI(true);
      setError("");
      setChatAnswer("");

      const res = await axios.get(
        `http://127.0.0.1:8000/chat/?q=${question}`
      );

      setChatAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setError("Error contacting AI");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Healthcare Plan Advisor</h1>

        {/* Age */}
        <div style={styles.inputGroup}>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Income */}
        <div style={styles.inputGroup}>
          <label>Annual Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        {/* Dependents */}
        <div style={styles.inputGroup}>
          <label>Dependents</label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
        </div>

        {/* Checkboxes */}
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={smoker}
              onChange={() => setSmoker(!smoker)}
            />
            Smoker
          </label>

          <label>
            <input
              type="checkbox"
              checked={disease}
              onChange={() => setDisease(!disease)}
            />
            Pre-existing Disease
          </label>
        </div>

        {/* Recommendation Button */}
        <button
          style={styles.button}
          onClick={getRecommendation}
          disabled={loadingRecommend}
        >
          {loadingRecommend ? "Calculating..." : "Get Recommendation"}
        </button>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Result */}
        {result && (
          <div style={styles.resultCard}>
            <h2>{result.plan}</h2>
            <p>Estimated Yearly Cost: ₹ {result.estimated_cost}</p>
            <p>Suggested Coverage: {result.suggested_coverage}</p>
          </div>
        )}

        <hr style={{ margin: "30px 0" }} />

        {/* Ask AI */}
        <div style={styles.inputGroup}>
          <label>Ask AI</label>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <button
          style={styles.buttonDark}
          onClick={askAI}
          disabled={loadingAI}
        >
          {loadingAI ? "Thinking..." : "Ask AI"}
        </button>

        {chatAnswer && (
          <div style={styles.chatBox}>
            <strong>AI:</strong>
            <p>{chatAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#2f4a7a",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  checkboxGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#3b5ea7",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonDark: {
    width: "100%",
    padding: "12px",
    background: "#1e3c72",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultCard: {
    marginTop: "20px",
    padding: "15px",
    background: "#f4f4f4",
    borderRadius: "8px",
  },
  chatBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#e9f1ff",
    borderRadius: "8px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default App;
