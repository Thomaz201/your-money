import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
// import { useContext } from 'react'
// import { TransactionsContext } from '../../contexts/TransactionContext'

export function Header() {
  // const { closeModal, isNewTransactionModalOpen } =
  //   useContext(TransactionsContext)

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/* <Dialog.Root onOpenChange={closeModal} open={isNewTransactionModalOpen}> */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
