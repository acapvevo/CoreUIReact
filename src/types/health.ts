export type Health = {
  finishedAt: number
  checkResults: {
    '5': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: {
        connection_name: string
      }
    }
    '3': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: {
        actual: boolean
        expected: boolean
      }
    }
    '4': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: {
        actual: string
        expected: string
      }
    }
    '0': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: Array<any>
    }
    '1': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: {
        connection_name: string
      }
    }
    '2': {
      name: string
      label: string
      notificationMessage: string
      shortSummary: string
      status: string
      meta: Array<any>
    }
  }
}
