import { useState, useEffect } from "react"
import { FaEye, FaEyeSlash, FaCcMastercard } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import "./CardComponent.css"

const Card = () => {
  const [cardDetails, setCardDetails] = useState(null)
  const [limit, setLimit] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    cvv: "",
    expiry: "",
    type: "",
    password: "",
  })
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("https://projeto-final-m5-api.onrender.com/:id/card", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCardDetails(response.data)
        setLimit(response.data.limit)
      } catch (error) {
        console.error("Erro ao buscar dados do cartão:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCardDetails()
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCard = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "https://projeto-final-m5-api.onrender.com/:id/card",
        newCard,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCardDetails(response.data)
      toast.success("Cartão adicionado com sucesso!")
      setIsAddingCard(false)
    } catch (error) {
      toast.error("Erro ao adicionar cartão.", error)
    }
  }

  return (
    <div className="card-container">
      <ToastContainer />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress /> 
        </Box>
      ) : isAddingCard ? (
        <form onSubmit={handleAddCard} className="add-card-form">
          <h2>Adicionar Cartão</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome no cartão"
            value={newCard.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="number"
            placeholder="Número do cartão"
            value={newCard.number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={newCard.cvv}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="expiry"
            placeholder="Data de validade (MM/AA)"
            value={newCard.expiry}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo (ex: crédito, débito)"
            value={newCard.type}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={newCard.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Adicionar Cartão</button>
          <button type="button" onClick={() => setIsAddingCard(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <div className="card">
            <div className="card-front">
              <div className="card-header-row">
                <h1 className="card-title">LunarPay</h1>
                <FaCcMastercard size={50} style={{ margin: "0 10px" }} />
              </div>

              <div className="card-header">
                <h2>{cardDetails?.name}</h2>
              </div>
              <div className="card-body">
                <div className="card-number">
                  <span>{cardDetails?.number.split(" ")[0]}</span>
                  <span>{cardDetails?.number.split(" ")[1]}</span>
                  <span>{cardDetails?.number.split(" ")[2]}</span>
                  <span>{cardDetails?.number.split(" ")[3]}</span>
                </div>
              </div>
            </div>

            <div className="card-back">
              <div className="magnetic-strip"></div>
              <div className="verse">
                <div className="cvv-expiry-container">
                  <div className="cvv-section">
                    <p>CVV</p>
                    <p>{cardDetails?.cvv}</p>
                  </div>
                  <div className="card-expiry">
                    <p>Validade</p>
                    <p>{cardDetails?.expiry}</p>
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
                <strong>Tipo:</strong> {cardDetails?.type}
              </p>
              <p>
                <strong>Senha:</strong>{" "}
                {showPassword ? cardDetails?.password : "*****"}
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </p>
            </div>
          </div>

          <button
            className="add-new-card-btn"
            onClick={() => setIsAddingCard(true)}
          >
            Adicionar Novo Cartão
          </button>
        </>
      )}
    </div>
  )
}

export default Card