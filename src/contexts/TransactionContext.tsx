import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../server/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: 'string'
  price: number
  created_at: string
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  // isNewTransactionModalOpen: boolean
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  // closeModal: () => void
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
  //   useState(false)

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, category, price, type } = data

    const response = await api.post('/transactions', {
      description,
      type,
      category,
      price,
      created_at: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  // function closeModal() {
  //   setIsNewTransactionModalOpen((state) => !!state)
  // }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        // isNewTransactionModalOpen,
        fetchTransactions,
        createTransaction,
        // closeModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
