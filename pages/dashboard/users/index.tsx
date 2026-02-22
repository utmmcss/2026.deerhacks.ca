import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  FooterPropsOverrides,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid'

import Modal from '@/components/Dashboard/Modal'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import { getColumns, getRows } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import TableFooter from '@/components/Dashboard/UsersTableComponents/TableFooter'
import TableToolbar from '@/components/Dashboard/UsersTableComponents/TableToolbar'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserList } from '@/hooks/User/useUserList'
import { useUserUpdateBatch } from '@/hooks/User/useUserUpdateBatch'
import { useAdminPointsAdjust } from '@/hooks/Workshop/useAdminPointsAdjust'
import { useUserPoints } from '@/hooks/Workshop/useUserPoints'
import Error404Page from '@/pages/404'
import Error500Page from '@/pages/500'
import {
  UserListData,
  UserListParams,
  UserStatus,
  userStatuses,
  UserUpdateBatchReq,
} from '@/types/User'

type PointsSectionProps = { discordId: string }

const PointsSection = ({ discordId }: PointsSectionProps) => {
  const { data, isLoading } = useUserPoints({ enabled: true, discordId })
  const { mutate: adjustPoints, isLoading: isAdjusting } = useAdminPointsAdjust()

  const [deductAmount, setDeductAmount] = useState('')
  const [adjType, setAdjType] = useState<'manual_adjustment' | 'prize_redemption'>(
    'manual_adjustment'
  )
  const [reason, setReason] = useState('')

  const handleSubmit = () => {
    const amount = parseInt(deductAmount)
    if (!amount || amount <= 0 || !reason.trim()) return
    adjustPoints({
      discord_id: discordId,
      delta: -amount,
      adjustment_type: adjType,
      reason: reason.trim(),
    })
    setDeductAmount('')
    setReason('')
  }

  return (
    <Box mt={2}>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" mb={1}>
        Workshop Points
      </Typography>
      {isLoading ? (
        <Typography color="text.secondary" variant="body2">
          Loading…
        </Typography>
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" color="primary.main" mb={1}>
            {data?.total_points ?? 0} pts
          </Typography>
          {data?.redemptions && data.redemptions.length > 0 && (
            <Box mb={2}>
              <Typography variant="subtitle2" mb={0.5}>
                Redemptions
              </Typography>
              {data.redemptions.map((r, i) => (
                <Typography key={i} variant="body2" color="text.secondary">
                  +{r.points_awarded} — {r.event_title} (
                  {new Date(r.redeemed_at).toLocaleString()})
                </Typography>
              ))}
            </Box>
          )}
          {data?.adjustments && data.adjustments.length > 0 && (
            <Box mb={2}>
              <Typography variant="subtitle2" mb={0.5}>
                Adjustments
              </Typography>
              {data.adjustments.map((a, i) => (
                <Typography key={i} variant="body2" color="text.secondary">
                  {a.delta > 0 ? '+' : ''}
                  {a.delta} [{a.adjustment_type}] — {a.reason} (
                  {new Date(a.adjusted_at).toLocaleString()})
                </Typography>
              ))}
            </Box>
          )}
        </>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" mb={1}>
        Deduct Points
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" alignItems="flex-start">
        <TextField
          label="Points to Deduct"
          value={deductAmount}
          onChange={(e) => setDeductAmount(e.target.value)}
          size="small"
          sx={{ width: 160 }}
          type="number"
          inputProps={{ min: 1 }}
        />
        <TextField
          select
          label="Type"
          value={adjType}
          onChange={(e) =>
            setAdjType(e.target.value as 'manual_adjustment' | 'prize_redemption')
          }
          size="small"
          sx={{ width: 200 }}
          SelectProps={{ native: true }}
        >
          <option value="manual_adjustment">Manual Adjustment</option>
          <option value="prize_redemption">Prize Redemption</option>
        </TextField>
        <TextField
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 180 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isAdjusting || !deductAmount || parseInt(deductAmount) <= 0 || !reason.trim()}
          size="small"
          sx={{ height: 40 }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  )
}

const PAGE_SIZE = 25

type ApplyFiltersProps = {
  full?: boolean
  page?: number
  statuses?: UserStatus[]
  internal_statuses?: (UserStatus | 'empty')[]
  search?: string
}

type Props = {
  isLoading: boolean
  dataFetched: boolean
  data: UserListData[]
  updateReq: UserUpdateBatchReq
  setUpdateReq: Dispatch<SetStateAction<UserUpdateBatchReq>>
  queryParams: UserListParams
  applyFilters: (newParams: ApplyFiltersProps) => void
  totalUsers: number
  fullWidth: boolean
  setFullWidth: (val: boolean) => void
  onSave: () => void
  userStatus: UserStatus
}

const UsersTable = (props: Props) => {
  const {
    isLoading,
    dataFetched,
    data,
    updateReq,
    setUpdateReq,
    queryParams,
    applyFilters,
    totalUsers,
    fullWidth,
    setFullWidth,
    onSave,
    userStatus,
  } = props

  const router = useRouter()
  const { toggles } = useFeatureToggle()

  const [originalData, setOriginalData] = useState(data)
  const [users, setUsers] = useState(data)
  const [rowCount, setRowCount] = useState(totalUsers)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    first_name: true,
    last_name: true,
    id: true,
    email: true,
    status: true,
    internal_status: toggles.internalFields,
    internal_notes: toggles.internalFields,
    application: true,
  })

  useEffect(() => {
    if (!dataFetched) return
    setOriginalData(data)
    setUsers(data)
    setRowCount(totalUsers)
    setUpdateReq({ users: [] })
    setSelectedRows([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFetched])

  const [applicationData, setApplicationData] = useState<UserListData>()
  const [openApplication, setOpenApplication] = useState(false)
  const handleOpenApplication = (data: UserListData) => {
    setApplicationData(data)
    setOpenApplication(true)
  }

  const hasUnsavedChanges = updateReq.users.length > 0

  useEffect(() => {
    const handleWindowClose = (e: any) => {
      if (!hasUnsavedChanges) return
      e.preventDefault()
      return (e.returnValue = 'You have unsaved changes. Are you sure you want to leave?')
    }
    const handleBrowseAway = () => {
      if (!hasUnsavedChanges) return
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) return
      router.events.emit('routeChangeError')
      throw 'routeChange aborted.'
    }
    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUnsavedChanges])

  const handleApplyFilters = (newParams: ApplyFiltersProps) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to proceed?')) return
      setUpdateReq({ users: [] })
    }
    applyFilters(newParams)
  }

  return (
    <>
      <DataGrid
        autoHeight
        getRowId={(row) => row.discord_id}
        rows={getRows(users)}
        columns={getColumns({
          users,
          setUsers,
          setUpdateReq,
          setApplicationData: handleOpenApplication,
          originalData,
          userStatus,
          statusUpdateToggle: toggles.statusUpdates || userStatus === 'admin',
        })}
        slots={{
          toolbar: TableToolbar,
          footer: TableFooter,
        }}
        slotProps={{
          toolbar: {
            queryParams,
            applyFilters: handleApplyFilters,
            onSave,
            hasUnsavedChanges,
            isLoading,
            selectedUsers: users.filter((u) => selectedRows.includes(u.discord_id)),
            onClearSelection: () => setSelectedRows([]),
          },
          footer: { fullWidth, setFullWidth } as FooterPropsOverrides,
        }}
        pageSizeOptions={[PAGE_SIZE]}
        paginationMode="server"
        loading={isLoading}
        rowCount={rowCount}
        paginationModel={{ page: queryParams.page - 1, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(model) => handleApplyFilters({ page: model.page + 1 })}
        disableColumnFilter
        density="comfortable"
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectedRows(newSelection as string[])
        }}
        disableRowSelectionOnClick={false}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      />
      <Suspense>
        <Modal
          open={openApplication}
          title={`Application - ${applicationData?.first_name} ${applicationData?.last_name}`}
          onClose={() => setOpenApplication(false)}
          TransitionProps={{
            onExited: () => setApplicationData(undefined),
          }}
          keepMounted
          maxWidth="xl"
        >
          <Box component="div" sx={{ pb: '1.5rem' }}>
            {applicationData && (
              <>
                <FormReview
                  user={applicationData}
                  application={{
                    ...applicationData.application,
                    resume_file_name: applicationData.resume_file_name,
                    resume_link: applicationData.resume_link,
                  }}
                  hideDisclaimer
                />
                <PointsSection discordId={applicationData.discord_id} />
              </>
            )}
          </Box>
        </Modal>
      </Suspense>
    </>
  )
}

const UsersTableLoader = () => {
  const { user, loading, authenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toggles } = useFeatureToggle()

  const allowedStatuses = ['admin', 'moderator']

  const [paramsObtained, setParamsObtained] = useState(false)
  const enabled =
    authenticated &&
    user?.status &&
    allowedStatuses.includes(user.status) &&
    toggles.dashboard &&
    paramsObtained

  const [fullWidth, setFullWidth] = useState(false)

  const [params, setParams] = useState<UserListParams>({
    full: false,
    page: 1,
    statuses: [],
    internal_statuses: [],
    search: '',
  })

  // changing params calls user-list
  const applyFilters = (props: ApplyFiltersProps) => {
    setParams((curr) => {
      const full = props.full ?? curr.full
      const page = props.page ?? curr.page
      const statuses = props.statuses ?? curr.statuses
      const internal_statuses = props.internal_statuses ?? curr.internal_statuses
      const search = props.search ?? curr.search

      const state = `page=${page}&app=${full}&statuses=${statuses.join(
        ','
      )}&internal_statuses=${internal_statuses.join(',')}&search=${search}`

      localStorage.setItem('deerhacks-user-list', state)
      router.replace(`/dashboard/users?${state}`, undefined, {
        shallow: true,
      })

      return { full, page, statuses, internal_statuses, search }
    })
  }

  const { data, isError, isFetching } = useUserList({
    params,
    enabled,
  })

  const { mutate: userUpdateBatch, isLoading: isUpdating } = useUserUpdateBatch()

  const [updateReq, setUpdateReq] = useState<UserUpdateBatchReq>({ users: [] })

  useEffect(() => {
    if (!router.isReady) return

    const tempParams = {} as {
      full: string | null
      page: number
      statuses: string | null
      internal_statuses: string | null
      search: string | null
    }

    const savedParams = localStorage.getItem('deerhacks-user-list')

    if (searchParams.size > 0) {
      // use url params first if they exist
      tempParams.full = searchParams.get('app')
      tempParams.page = parseInt(searchParams.get('page') ?? '')
      tempParams.statuses = searchParams.get('statuses')
      tempParams.internal_statuses = searchParams.get('internal_statuses')
      tempParams.search = searchParams.get('search')
    } else if (!!savedParams) {
      // otherwise get params from localhost if they exist
      const params = savedParams.split('&').reduce((obj: { [key: string]: string }, str) => {
        const parts = str.split('=')
        obj[parts?.[0]] = parts?.[1]
        return obj
      }, {})
      tempParams.full = params?.app
      tempParams.page = parseInt(params?.page)
      tempParams.statuses = params?.statuses
      tempParams.internal_statuses = params?.internal_statuses
      tempParams.search = params?.search
    }

    if (
      tempParams.full &&
      ['true', 'false'].includes(tempParams.full) &&
      tempParams.page > 0 // DataGrid handles page size over limit
    ) {
      // use params only if all three are valid
      applyFilters({
        full: tempParams.full === 'true',
        page: tempParams.page,
        statuses: (tempParams.statuses ?? '')
          .split(',')
          .filter((status) => userStatuses.includes(status as UserStatus)) as UserStatus[],
        internal_statuses: (tempParams.internal_statuses ?? '')
          .split(',')
          .filter(
            (status) => userStatuses.includes(status as UserStatus) || status === 'empty'
          ) as UserStatus[],
        search: tempParams.search ?? '',
      })
    } else {
      // default values
      applyFilters({ full: false, page: 1, statuses: [], internal_statuses: [], search: '' })
    }

    setParamsObtained(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  if (!toggles.dashboard || (user?.status && !allowedStatuses.includes(user.status))) {
    return <Error404Page />
  }

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Users Table | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || !paramsObtained ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            maxWidth={fullWidth ? false : 'lg'}
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography variant="h1">Users Table</Typography>
            <UsersTable
              isLoading={isFetching || isUpdating}
              dataFetched={!isFetching && !!data}
              data={data?.users ?? []}
              updateReq={updateReq}
              setUpdateReq={setUpdateReq}
              queryParams={params}
              applyFilters={applyFilters}
              totalUsers={data?.pagination.total_users ?? 0}
              fullWidth={fullWidth}
              setFullWidth={setFullWidth}
              onSave={() => userUpdateBatch(updateReq)}
              userStatus={user.status}
            />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default UsersTableLoader
