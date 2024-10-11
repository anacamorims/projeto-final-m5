import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FaEye, FaEyeSlash, FaCcMastercard } from "react-icons/fa"
import axios from "axios"
import "./CardComponent.css"

const Card = () => {
  const [cardDetails, setCardDetails] = useState(null)
  const [limit, setLimit] = useState(5000)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        
        const token = localStorage.getItem("token");
        
        const response = await axios.get("https://projeto-final-m5-api.onrender.com/:id/card", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCardDetails(response.data)
        setLimit(response.data.limit)
      } catch (error) {
        console.error("Erro ao buscar dados do cartão:", error)
      }
    }

    fetchCardData()
  }, [])

  if (!cardDetails) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-front">
          <div className="card-header-row">
            <h1 className="card-title">Cosmic Bank</h1>
            <FaCcMastercard size={50} style={{ margin: "0 10px" }} />
          </div>

          <div className="card-header">
            <h2>{cardDetails.name}</h2>
          </div>
          <div className="card-body">
            <div className="card-number">
              <span>{cardDetails.number.split(" ")[0]}</span>
              <span>{cardDetails.number.split(" ")[1]}</span>
              <span>{cardDetails.number.split(" ")[2]}</span>
              <span>{cardDetails.number.split(" ")[3]}</span>
            </div>
          </div>
        </div>

        <div className="card-back">
          <div className="magnetic-strip"></div>
          <div className="verse">
            <div className="cvv-expiry-container">
              <div className="cvv-section">
                <p>CVV</p>
                <p>{cardDetails.cvv}</p>
              </div>
              <div className="card-expiry">
                <p>Validade</p>
                <p>{cardDetails.expiry}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-info-section">
        <div className="card-info-details">
          <p>
            <strong>Limite:</strong> R$ {limit}
          </p>
          <p>
            <strong>Tipo:</strong> {cardDetails.type}
          </p>
          <p>
            <strong>Senha:</strong> {showPassword ? cardDetails.password : '*****'} 
            <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '8px' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
