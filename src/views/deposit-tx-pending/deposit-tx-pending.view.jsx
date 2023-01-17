import { useEffect } from 'react'
import Header from '../shared/header/header.view'
import useTxPendingStyles from './deposit-tx-pending.styles'
import { ReactComponent as LinkIcon } from '../../images/link-icon.svg'
import Spinner from '../shared/spinner/spinner.view'

import { NETWORKS } from '../../constants'

function TxPending ({ wallet, txData, onGoBack, onGoToOverviewStep }) {
  const classes = useTxPendingStyles()

  useEffect(() => {
    if (txData.status === 'failed') {
      onGoBack()
    }
    if (txData.status === 'successful') {
      onGoToOverviewStep()
    }
  }, [txData, onGoBack, onGoToOverviewStep])

  return (
    <div className={classes.txOverview}>
      <Header
        address={wallet.address}
        title="Gitshock Beacon Chain Deposit"
      />
      <div className={classes.spinnerWrapper}>
        <Spinner className={classes.title} />
      </div>
      {txData.isArray ? (
        <p className={classes.title}>
          Waiting for {txData?.data.length} transactions to be processed.<br />
          This may take some time
        </p>
      ) : (
        <>
          <p className={classes.title}>Deposit transaction has been initiated.</p>
          <div className={classes.buttonGroup}>
            <a
              className={classes.button}
              href={`${NETWORKS[wallet.chainId].blockExplorerUrl}/tx/${txData?.data?.hash}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Check transaction status here
              <LinkIcon className={classes.buttonIcon} />
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default TxPending
