import Head from 'next/head'
import { useEffect, useState } from 'react'

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupsIcon from '@mui/icons-material/Groups'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import MailIcon from '@mui/icons-material/Mail'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import UserProfileModal from '@/components/Dashboard/UserProfileModal'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import {
  useMatchmakingHeartbeat,
  useMatchmakingProfile,
  useMatchmakingQueueJoin,
  useMatchmakingQueueLeave,
  useMatchmakingRematch,
  useMatchmakingUpsert,
} from '@/hooks/Matchmaking'
import {
  useAvailableUsers,
  useTeamCreate,
  useTeamDisband,
  useTeamGet,
  useTeamHeartbeat,
  useTeamInviteRespond,
  useTeamInvitesReceived,
  useTeamLeave,
  useTeamRemoveMember,
  useTeamRequestJoin,
  useTeamRespondJoin,
  useTeamsList,
  useTeamTransfer,
  useTeamUpdate,
} from '@/hooks/Team'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import { interestsOptions } from '@/types/Application'
import { MATCHMAKING_PROJECT_PREFS,MATCHMAKING_ROLES } from '@/types/Matchmaking'
import type { AvailableUser,TeamMember } from '@/types/Team'

const FULL_TAG = '[FULL]'

/** Generate a consistent color from a string (name/username) */
const stringToColor = (str: string) => {
  const colors = [
    '#5d99c6', '#66bb6a', '#ffa726', '#ef5350',
    '#ab47bc', '#26c6da', '#ec407a', '#7e57c2',
    '#42a5f5', '#26a69a', '#d4e157', '#ff7043',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const TeamsPage = () => {
  const { user, loading, authenticated } = useAuth()
  const isAccepted = ['accepted', 'attended', 'admin', 'moderator'].includes(user?.status ?? '')

  const [tab, setTab] = useState(0)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDescription, setNewTeamDescription] = useState('')
  const [sortBy, setSortBy] = useState('last_active')

  const { data: myTeamData, isLoading: teamLoading } = useTeamGet({ enabled: isAccepted })
  const { data: teamsListData, isLoading: teamsListLoading, isError: teamsListError } = useTeamsList({
    sort: sortBy,
    enabled: isAccepted && tab === 1,
  })
  const { data: availableUsersData, isLoading: availableUsersLoading, isError: availableUsersError } = useAvailableUsers({
    enabled: isAccepted && tab === 2,
  })

  const { mutate: createTeam, isLoading: isCreating } = useTeamCreate()
  const { mutate: updateTeam, isLoading: isUpdating } = useTeamUpdate()
  const { mutate: requestJoin, isLoading: isRequesting } = useTeamRequestJoin()
  const { mutate: respondJoin, isLoading: isResponding } = useTeamRespondJoin()
  const { mutate: removeMember, isLoading: isRemoving } = useTeamRemoveMember()
  const { mutate: leaveTeam, isLoading: isLeaving } = useTeamLeave()
  const { mutate: transferOwnership, isLoading: isTransferring } = useTeamTransfer()
  const { mutate: disbandTeam, isLoading: isDisbanding } = useTeamDisband()
  const { mutate: heartbeat } = useTeamHeartbeat()
  const { data: invitesData } = useTeamInvitesReceived({ enabled: isAccepted && !myTeamData?.team })
  const { mutate: respondInvite, isLoading: isRespondingInvite } = useTeamInviteRespond()

  // Matchmaking state
  const [matchRole, setMatchRole] = useState('')
  const [matchProjectPref, setMatchProjectPref] = useState('')
  const [matchInterests, setMatchInterests] = useState<string[]>([])
  const [showMatchForm, setShowMatchForm] = useState(false)

  // Profile modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSubject, setModalSubject] = useState<
    | { kind: 'available'; user: AvailableUser }
    | { kind: 'teammate'; member: TeamMember }
    | null
  >(null)

  const myTeam = myTeamData?.team
  const isOwner = myTeam && user && myTeam.owner_discord_id === user.discord_id

  // Matchmaking hooks
  const { data: matchProfileData } = useMatchmakingProfile({ enabled: isAccepted && !myTeam })
  const { mutate: upsertProfile, isLoading: isUpsertingProfile } = useMatchmakingUpsert()
  const { mutate: joinQueue, isLoading: isJoiningQueue } = useMatchmakingQueueJoin()
  const { mutate: leaveQueue, isLoading: isLeavingQueue } = useMatchmakingQueueLeave()
  const { mutate: rematch, isLoading: isRematching } = useMatchmakingRematch()
  const { mutate: matchHeartbeat } = useMatchmakingHeartbeat()

  const matchProfile = matchProfileData?.profile

  // Determine if team is marked as full via the description tag
  const isTeamFull = myTeam?.description?.includes(FULL_TAG) ?? false

  // Heartbeat every 10 minutes when on a team
  useEffect(() => {
    if (!myTeam) return
    const interval = setInterval(() => heartbeat(undefined), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [myTeam, heartbeat])

  // Matchmaking heartbeat every 60s while in queue
  useEffect(() => {
    if (!matchProfile?.in_queue) return
    const interval = setInterval(() => matchHeartbeat(undefined), 60 * 1000)
    return () => clearInterval(interval)
  }, [matchProfile?.in_queue, matchHeartbeat])

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return
    createTeam(
      { data: { name: newTeamName.trim(), description: newTeamDescription.trim() } },
      {
        onSuccess: () => {
          setNewTeamName('')
          setNewTeamDescription('')
        },
      }
    )
  }

  const handleToggleFull = () => {
    if (!myTeam) return
    const currentDesc = myTeam.description || ''

    if (isTeamFull) {
      // Remove the [FULL] tag
      const newDesc = currentDesc.replace(FULL_TAG, '').trim()
      updateTeam({ data: { description: newDesc } })
    } else {
      // Add the [FULL] tag
      const newDesc = currentDesc ? `${currentDesc} ${FULL_TAG}` : FULL_TAG
      updateTeam({ data: { description: newDesc } })
    }
  }

  const handleRequestJoin = (teamId: number) => {
    requestJoin({ data: { team_id: teamId } })
  }

  const handleRespondJoin = (userId: number, action: 'approve' | 'reject') => {
    respondJoin({ data: { user_id: userId, action } })
  }

  const handleRemoveMember = (userId: number) => {
    if (!confirm('Remove this member from the team?')) return
    removeMember({ userId })
  }

  const handleLeaveTeam = () => {
    if (!confirm('Are you sure you want to leave this team?')) return
    leaveTeam(undefined)
  }

  const handleTransferOwnership = (newOwnerId: number) => {
    if (!confirm('Transfer ownership to this member?')) return
    transferOwnership({ data: { new_owner_id: newOwnerId } })
  }

  const handleDisbandTeam = () => {
    if (!confirm('Are you sure you want to disband this team? This cannot be undone.')) return
    disbandTeam(undefined)
  }

  const handleMatchmakingSubmit = () => {
    if (!matchRole || !matchProjectPref || matchInterests.length === 0) return
    upsertProfile(
      { data: { role: matchRole, project_preference: matchProjectPref, interests: matchInterests } },
      { onSuccess: () => joinQueue(undefined) }
    )
  }

  const handleLeaveQueue = () => {
    leaveQueue(undefined)
  }

  const handleRematch = () => {
    if (!confirm('Leave your current team and find a new match?')) return
    rematch(undefined)
  }

  const handleOpenModal = (
    subject: { kind: 'available'; user: AvailableUser } | { kind: 'teammate'; member: TeamMember }
  ) => {
    setModalSubject(subject)
    setModalOpen(true)
  }

  const handleInviteRespond = (inviteId: number, action: 'accept' | 'reject') => {
    respondInvite({ data: { invite_id: inviteId, action } })
  }

  if (!loading && !authenticated) return <Error401Page />
  if (!loading && !isAccepted) return <Error404Page />

  const joinedMembers = myTeam?.members.filter((m) => m.state === 'joined') ?? []
  const pendingMembers = myTeam?.members.filter((m) => m.state === 'pending') ?? []

  /** Strip the [FULL] tag from description for display */
  const displayDescription = (desc: string | undefined) => {
    if (!desc) return null
    const cleaned = desc.replace(FULL_TAG, '').trim()
    return cleaned || null
  }

  return (
    <>
      <Head>
        <title>Teams | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            maxWidth="lg"
            sx={{
              minHeight: '100vh',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'stretch',
              py: 4,
            }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />

            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="h1" gutterBottom>
                Teams
              </Typography>

              {/* Tabs */}
              <Box
                component="div"
                sx={{
                  borderBottom: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                  mb: 3,
                }}
              >
                <Tabs
                  value={tab}
                  onChange={(_, v) => setTab(v)}
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      minHeight: 56,
                    },
                  }}
                >
                  <Tab icon={<GroupsIcon />} label="My Team" iconPosition="start" />
                  <Tab icon={<GroupAddIcon />} label="Browse Teams" iconPosition="start" />
                  <Tab icon={<PersonSearchIcon />} label="Find Teammates" iconPosition="start" />
                </Tabs>
              </Box>

              {/* Tab 0: My Team */}
              {tab === 0 && (
                <Box component="div" sx={{ width: '100%' }}>
                  {teamLoading ? (
                    <Box component="div" display="flex" justifyContent="center" py={8}>
                      <CircularProgress />
                    </Box>
                  ) : myTeam ? (
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      {/* Team header card */}
                      <Card
                        sx={{
                          height: 'auto',
                          background:
                            'radial-gradient(ellipse at 20% 0%, rgba(90,200,250,0.08) 0%, transparent 60%), rgba(30, 30, 35, 0.6)',
                        }}
                      >
                        <CardContent sx={{ height: 'auto' }}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            spacing={2}
                          >
                            <Box component="div">
                              <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Typography
                                  variant="h5"
                                  sx={{ color: '#fff', fontWeight: 600, mb: 0 }}
                                >
                                  {myTeam.name}
                                </Typography>
                                {isTeamFull && (
                                  <Chip
                                    icon={<LockIcon sx={{ fontSize: '0.85rem !important' }} />}
                                    label="Full"
                                    size="small"
                                    color="warning"
                                    sx={{ fontWeight: 500 }}
                                  />
                                )}
                              </Stack>
                              {displayDescription(myTeam.description) && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 0.5 }}
                                >
                                  {displayDescription(myTeam.description)}
                                </Typography>
                              )}
                            </Box>
                            {isOwner && (
                              <Tooltip
                                title={
                                  isTeamFull
                                    ? 'Your team is hidden from public browsing. Click to re-open.'
                                    : 'Mark your team as full to hide it from public browsing.'
                                }
                              >
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={handleToggleFull}
                                  disabled={isUpdating}
                                  startIcon={isTeamFull ? <LockOpenIcon /> : <LockIcon />}
                                  color={isTeamFull ? 'success' : 'warning'}
                                  sx={{
                                    borderRadius: '0.75rem',
                                    px: 2,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {isTeamFull ? 'Re-open Team' : 'Mark as Full'}
                                </Button>
                              </Tooltip>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* Discord encouragement */}
                      <Alert
                        severity="info"
                        icon={false}
                        sx={{
                          background:
                            'linear-gradient(135deg, rgba(88,101,242,0.15) 0%, rgba(88,101,242,0.05) 100%)',
                          border: '1px solid rgba(88,101,242,0.3)',
                          borderRadius: '12px',
                          '& .MuiAlert-message': { width: '100%' },
                        }}
                      >
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={1.5}
                        >
                          <Box
                            component="span"
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 36,
                              height: 36,
                              borderRadius: '8px',
                              background: 'rgba(88,101,242,0.2)',
                              flexShrink: 0,
                            }}
                          >
                            <svg
                              width="20"
                              height="16"
                              viewBox="0 0 71 55"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3934 44.2813 53.4831 44.2926 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                                fill="#5865F2"
                              />
                            </svg>
                          </Box>
                          <Box component="div">
                            <Typography
                              variant="body2"
                              sx={{ color: '#fff', fontWeight: 500, lineHeight: 1.4 }}
                            >
                              Connect with your teammates on Discord!
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.8rem' }}>
                              Coordinate your project ideas, share resources, and get to know each
                              other before the hackathon starts.
                            </Typography>
                          </Box>
                        </Stack>
                      </Alert>

                      {/* Members card */}
                      <Card sx={{ height: 'auto' }}>
                        <CardContent sx={{ height: 'auto' }}>
                          <Typography
                            variant="h6"
                            sx={{ color: '#fff', fontWeight: 600, mb: 2 }}
                          >
                            Members ({joinedMembers.length})
                          </Typography>
                          <List sx={{ py: 0 }}>
                            {joinedMembers.map((member: TeamMember, idx: number) => (
                              <Box component="div" key={member.user_id}>
                                {idx > 0 && (
                                  <Divider
                                    sx={{
                                      my: 0.5,
                                      borderColor: 'rgba(255,255,255,0.05)',
                                      opacity: 1,
                                    }}
                                  />
                                )}
                                <ListItem
                                  sx={{
                                    px: 1,
                                    py: 1,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255,255,255,0.05)',
                                    },
                                  }}
                                  onClick={() => handleOpenModal({ kind: 'teammate', member })}
                                  secondaryAction={
                                    isOwner && !member.is_owner ? (
                                      <Stack direction="row" spacing={1}>
                                        <Button
                                          size="small"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleTransferOwnership(member.user_id)
                                          }}
                                          disabled={isTransferring}
                                          sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                                        >
                                          Make Owner
                                        </Button>
                                        <Button
                                          size="small"
                                          color="error"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveMember(member.user_id)
                                          }}
                                          disabled={isRemoving}
                                          sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                                        >
                                          Remove
                                        </Button>
                                      </Stack>
                                    ) : null
                                  }
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{
                                        bgcolor: stringToColor(
                                          `${member.first_name}${member.last_name}`
                                        ),
                                        width: 36,
                                        height: 36,
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                      }}
                                    >
                                      {member.first_name[0]}
                                      {member.last_name[0]}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography
                                          variant="body2"
                                          sx={{ color: '#fff', fontWeight: 500 }}
                                        >
                                          {member.first_name} {member.last_name}
                                        </Typography>
                                        {member.is_owner && (
                                          <Chip
                                            label="Owner"
                                            size="small"
                                            color="primary"
                                            sx={{ height: 20, fontSize: '0.7rem' }}
                                          />
                                        )}
                                      </Stack>
                                    }
                                    secondary={`@${member.username}`}
                                  />
                                </ListItem>
                              </Box>
                            ))}
                          </List>
                        </CardContent>
                      </Card>

                      {/* Pending requests card (owner only) */}
                      {isOwner && pendingMembers.length > 0 && (
                        <Card
                          sx={{
                            height: 'auto',
                            border: '1px solid rgba(255,167,38,0.2)',
                            background:
                              'radial-gradient(ellipse at 80% 0%, rgba(255,167,38,0.06) 0%, transparent 50%), rgba(30, 30, 35, 0.6)',
                          }}
                        >
                          <CardContent sx={{ height: 'auto' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{ color: '#fff', fontWeight: 600 }}
                              >
                                Pending Requests
                              </Typography>
                              <Chip
                                label={pendingMembers.length}
                                size="small"
                                color="warning"
                                sx={{ height: 22, fontWeight: 600 }}
                              />
                            </Stack>
                            <List sx={{ py: 0 }}>
                              {pendingMembers.map((member: TeamMember, idx: number) => (
                                <Box component="div" key={member.user_id}>
                                  {idx > 0 && (
                                    <Divider
                                      sx={{
                                        my: 0.5,
                                        borderColor: 'rgba(255,255,255,0.05)',
                                        opacity: 1,
                                      }}
                                    />
                                  )}
                                  <ListItem
                                    sx={{
                                      px: 1,
                                      py: 1,
                                      borderRadius: '8px',
                                    }}
                                    secondaryAction={
                                      <Stack direction="row" spacing={1}>
                                        <Button
                                          size="small"
                                          color="success"
                                          onClick={() =>
                                            handleRespondJoin(member.user_id, 'approve')
                                          }
                                          disabled={isResponding}
                                          sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          size="small"
                                          color="error"
                                          onClick={() =>
                                            handleRespondJoin(member.user_id, 'reject')
                                          }
                                          disabled={isResponding}
                                          sx={{ fontSize: '0.75rem', py: 0.5, px: 1.5 }}
                                        >
                                          Reject
                                        </Button>
                                      </Stack>
                                    }
                                  >
                                    <ListItemAvatar>
                                      <Avatar
                                        sx={{
                                          bgcolor: stringToColor(
                                            `${member.first_name}${member.last_name}`
                                          ),
                                          width: 36,
                                          height: 36,
                                          fontSize: '0.85rem',
                                          fontWeight: 600,
                                        }}
                                      >
                                        {member.first_name[0]}
                                        {member.last_name[0]}
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={`${member.first_name} ${member.last_name}`}
                                      secondary={`@${member.username}`}
                                      primaryTypographyProps={{
                                        sx: { color: '#fff', fontWeight: 500, fontSize: '0.875rem' },
                                      }}
                                    />
                                  </ListItem>
                                </Box>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
                      )}

                      {/* Team actions */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        {isOwner ? (
                          joinedMembers.length === 1 ? (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={handleDisbandTeam}
                              disabled={isDisbanding}
                              sx={{ borderRadius: '0.75rem' }}
                            >
                              Disband Team
                            </Button>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Transfer ownership to another member before disbanding.
                            </Typography>
                          )
                        ) : (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleLeaveTeam}
                            disabled={isLeaving}
                            sx={{ borderRadius: '0.75rem' }}
                          >
                            Leave Team
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleRematch}
                          disabled={isRematching}
                          startIcon={<AutoFixHighIcon />}
                          sx={{ borderRadius: '0.75rem' }}
                        >
                          Find a Different Team
                        </Button>
                      </Stack>
                    </Stack>
                  ) : matchProfile?.in_queue ? (
                    /* In matchmaking queue - waiting state */
                    <Card
                      sx={{
                        height: 'auto',
                        background:
                          'radial-gradient(ellipse at 50% 0%, rgba(90,200,250,0.08) 0%, transparent 60%), rgba(30, 30, 35, 0.6)',
                        border: '1px solid rgba(90,200,250,0.2)',
                      }}
                    >
                      <CardContent sx={{ height: 'auto' }}>
                        <Stack spacing={3} alignItems="center" sx={{ py: 3 }}>
                          <CircularProgress size={48} />
                          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                            Looking for teammates...
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 420 }}>
                            Sit tight! We&apos;re finding the best match for you based on your preferences.
                            This page will update automatically.
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
                            {matchProfile.role && (
                              <Chip
                                label={MATCHMAKING_ROLES.find((r) => r.value === matchProfile.role)?.label ?? matchProfile.role}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 500 }}
                              />
                            )}
                            {matchProfile.project_preference && (
                              <Chip
                                label={MATCHMAKING_PROJECT_PREFS.find((p) => p.value === matchProfile.project_preference)?.label ?? matchProfile.project_preference}
                                size="small"
                                color="secondary"
                                sx={{ fontWeight: 500 }}
                              />
                            )}
                            {matchProfile.interests.map((interest) => (
                              <Chip
                                key={interest}
                                label={interest}
                                size="small"
                                sx={{ height: 24, fontSize: '0.75rem' }}
                              />
                            ))}
                          </Stack>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleLeaveQueue}
                            disabled={isLeavingQueue}
                            sx={{ borderRadius: '0.75rem' }}
                          >
                            Leave Queue
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  ) : matchProfile?.matched_team_id != null ? (
                    /* Matched - success state */
                    <Card
                      sx={{
                        height: 'auto',
                        background:
                          'radial-gradient(ellipse at 50% 0%, rgba(102,187,106,0.1) 0%, transparent 60%), rgba(30, 30, 35, 0.6)',
                        border: '1px solid rgba(102,187,106,0.3)',
                      }}
                    >
                      <CardContent sx={{ height: 'auto' }}>
                        <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
                          <AutoFixHighIcon sx={{ fontSize: 48, color: '#66bb6a' }} />
                          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                            You&apos;ve been matched!
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            You&apos;ve been placed on a team. This page will refresh shortly.
                          </Typography>
                          <CircularProgress size={24} />
                        </Stack>
                      </CardContent>
                    </Card>
                  ) : (
                    /* No team - create form + matchmaking */
                    <Stack spacing={3}>
                      {/* Pending Invites */}
                      {invitesData?.invites && invitesData.invites.length > 0 && (
                        <Card
                          sx={{
                            height: 'auto',
                            border: '1px solid rgba(93,153,198,0.3)',
                            background:
                              'radial-gradient(ellipse at 80% 0%, rgba(93,153,198,0.08) 0%, transparent 50%), rgba(30, 30, 35, 0.6)',
                          }}
                        >
                          <CardContent sx={{ height: 'auto' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                              <MailIcon sx={{ color: '#5d99c6', fontSize: 20 }} />
                              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                                Team Invites
                              </Typography>
                              <Chip
                                label={invitesData.invites.length}
                                size="small"
                                color="primary"
                                sx={{ height: 22, fontWeight: 600 }}
                              />
                            </Stack>
                            <Stack spacing={1.5}>
                              {invitesData.invites.map((invite) => (
                                <Card
                                  key={invite.id}
                                  variant="outlined"
                                  sx={{ height: 'auto', background: 'rgba(255,255,255,0.02)' }}
                                >
                                  <CardContent sx={{ height: 'auto', py: '12px !important' }}>
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <Box component="div" sx={{ minWidth: 0 }}>
                                        <Typography
                                          variant="body2"
                                          sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}
                                        >
                                          {invite.team_name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                          from {invite.owner_first_name} {invite.owner_last_name}
                                        </Typography>
                                      </Box>
                                      <Stack direction="row" spacing={1} flexShrink={0}>
                                        <Button
                                          size="small"
                                          variant="contained"
                                          color="success"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleInviteRespond(invite.id, 'accept')
                                          }}
                                          disabled={isRespondingInvite}
                                          sx={{
                                            fontSize: '0.75rem',
                                            py: 0.5,
                                            px: 1.5,
                                            borderRadius: '0.5rem',
                                          }}
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          size="small"
                                          variant="outlined"
                                          color="error"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleInviteRespond(invite.id, 'reject')
                                          }}
                                          disabled={isRespondingInvite}
                                          sx={{
                                            fontSize: '0.75rem',
                                            py: 0.5,
                                            px: 1.5,
                                            borderRadius: '0.5rem',
                                          }}
                                        >
                                          Decline
                                        </Button>
                                      </Stack>
                                    </Stack>
                                  </CardContent>
                                </Card>
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      )}

                      <Card sx={{ height: 'auto' }}>
                        <CardContent sx={{ height: 'auto' }}>
                          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                            Create a Team
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Start a team and invite others to join you for the hackathon.
                          </Typography>
                          <Stack spacing={2.5} sx={{ maxWidth: 480 }}>
                            <TextField
                              label="Team Name"
                              value={newTeamName}
                              onChange={(e) => setNewTeamName(e.target.value)}
                              inputProps={{ maxLength: 50 }}
                              required
                              fullWidth
                            />
                            <TextField
                              label="Description (optional)"
                              value={newTeamDescription}
                              onChange={(e) => setNewTeamDescription(e.target.value)}
                              inputProps={{ maxLength: 500 }}
                              multiline
                              rows={3}
                              fullWidth
                            />
                            <Button
                              variant="contained"
                              onClick={handleCreateTeam}
                              disabled={!newTeamName.trim() || isCreating}
                              startIcon={<GroupAddIcon />}
                              sx={{ alignSelf: 'flex-start' }}
                            >
                              Create Team
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>

                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="body2" color="text.secondary">
                          or
                        </Typography>
                      </Divider>

                      {!showMatchForm ? (
                        <Button
                          variant="outlined"
                          size="large"
                          onClick={() => setShowMatchForm(true)}
                          startIcon={<AutoFixHighIcon />}
                          sx={{
                            borderRadius: '0.75rem',
                            alignSelf: 'center',
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          Auto-Match Me
                        </Button>
                      ) : (
                        <Card
                          sx={{
                            height: 'auto',
                            background:
                              'radial-gradient(ellipse at 20% 0%, rgba(171,71,188,0.08) 0%, transparent 60%), rgba(30, 30, 35, 0.6)',
                            border: '1px solid rgba(171,71,188,0.2)',
                          }}
                        >
                          <CardContent sx={{ height: 'auto' }}>
                            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                              Auto-Match Me
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                              Tell us about yourself and we&apos;ll find a team that fits.
                            </Typography>
                            <Stack spacing={2.5} sx={{ maxWidth: 480 }}>
                              <FormControl fullWidth required>
                                <InputLabel>Role</InputLabel>
                                <Select
                                  value={matchRole}
                                  label="Role"
                                  onChange={(e) => setMatchRole(e.target.value)}
                                >
                                  {MATCHMAKING_ROLES.map((r) => (
                                    <MenuItem key={r.value} value={r.value}>
                                      {r.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth required>
                                <InputLabel>Project Preference</InputLabel>
                                <Select
                                  value={matchProjectPref}
                                  label="Project Preference"
                                  onChange={(e) => setMatchProjectPref(e.target.value)}
                                >
                                  {MATCHMAKING_PROJECT_PREFS.map((p) => (
                                    <MenuItem key={p.value} value={p.value}>
                                      {p.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Autocomplete
                                multiple
                                options={interestsOptions as unknown as string[]}
                                value={matchInterests}
                                onChange={(_, newVal) => setMatchInterests(newVal)}
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      label={option}
                                      size="small"
                                      {...getTagProps({ index })}
                                      key={option}
                                      sx={{ height: 24, fontSize: '0.75rem' }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Interests"
                                    placeholder="Select interests..."
                                    required
                                  />
                                )}
                              />
                              <Stack direction="row" spacing={2}>
                                <Button
                                  variant="contained"
                                  onClick={handleMatchmakingSubmit}
                                  disabled={
                                    !matchRole ||
                                    !matchProjectPref ||
                                    matchInterests.length === 0 ||
                                    isUpsertingProfile ||
                                    isJoiningQueue
                                  }
                                  startIcon={<AutoFixHighIcon />}
                                  sx={{ alignSelf: 'flex-start' }}
                                >
                                  Find Me a Team
                                </Button>
                                <Button
                                  variant="text"
                                  size="small"
                                  onClick={() => setShowMatchForm(false)}
                                  sx={{ alignSelf: 'flex-start' }}
                                >
                                  Cancel
                                </Button>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      )}
                    </Stack>
                  )}
                </Box>
              )}

              {/* Tab 1: Browse Teams */}
              {tab === 1 && (
                <Box component="div" sx={{ width: '100%' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {teamsListData
                        ? `${teamsListData.teams.length} teams available \u00B7 Max team size: ${teamsListData.max_size}`
                        : 'Loading teams...'}
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <MenuItem value="last_active">Most Active</MenuItem>
                        <MenuItem value="created">Newest</MenuItem>
                        <MenuItem value="members">Most Members</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  {teamsListLoading ? (
                    <Box component="div" display="flex" justifyContent="center" py={6}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      {teamsListData?.teams
                        .filter((team) => !team.description?.includes(FULL_TAG))
                        .map((team) => {
                          const maxSize = teamsListData.max_size
                          const spotsLeft = maxSize - team.member_count
                          const fillPercent = (team.member_count / maxSize) * 100
                          const isFull = spotsLeft <= 0

                          return (
                            <Card
                              key={team.id}
                              variant="outlined"
                              sx={{
                                height: 'auto',
                                opacity: isFull ? 0.6 : 1,
                                '&:hover': {
                                  transform: isFull ? 'none' : 'translateY(-2px)',
                                },
                              }}
                            >
                              <CardContent sx={{ height: 'auto' }}>
                                <Stack spacing={1.5}>
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                  >
                                    <Box component="div" sx={{ flex: 1, minWidth: 0 }}>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: '#fff',
                                          fontWeight: 600,
                                          fontSize: '1rem',
                                        }}
                                      >
                                        {team.name}
                                      </Typography>
                                      {displayDescription(team.description) && (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{
                                            mt: 0.5,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            fontSize: '0.8rem',
                                          }}
                                        >
                                          {displayDescription(team.description)}
                                        </Typography>
                                      )}
                                    </Box>
                                    {!myTeam && !isFull && (
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleRequestJoin(team.id)}
                                        disabled={isRequesting}
                                        sx={{
                                          borderRadius: '0.75rem',
                                          ml: 2,
                                          flexShrink: 0,
                                          fontSize: '0.8rem',
                                          px: 2,
                                          py: 0.75,
                                        }}
                                      >
                                        Request to Join
                                      </Button>
                                    )}
                                  </Stack>

                                  {/* Member count bar */}
                                  <Box component="div">
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      sx={{ mb: 0.5 }}
                                    >
                                      <Stack direction="row" alignItems="center" spacing={1}>
                                        <AvatarGroup
                                          max={4}
                                          sx={{
                                            '& .MuiAvatar-root': {
                                              width: 24,
                                              height: 24,
                                              fontSize: '0.7rem',
                                              border: '2px solid rgba(30,30,35,0.8)',
                                            },
                                          }}
                                        >
                                          {Array.from({ length: team.member_count }).map(
                                            (_, i) => (
                                              <Avatar
                                                key={i}
                                                sx={{
                                                  bgcolor: stringToColor(
                                                    `${team.name}-member-${i}`
                                                  ),
                                                }}
                                              >
                                                {' '}
                                              </Avatar>
                                            )
                                          )}
                                        </AvatarGroup>
                                      </Stack>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: isFull
                                            ? 'error.main'
                                            : spotsLeft <= 1
                                            ? 'warning.main'
                                            : 'text.secondary',
                                          fontWeight: 500,
                                          fontSize: '0.75rem',
                                        }}
                                      >
                                        {isFull
                                          ? 'Team Full'
                                          : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
                                      </Typography>
                                    </Stack>
                                    <LinearProgress
                                      variant="determinate"
                                      value={fillPercent}
                                      sx={{
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: 'rgba(255,255,255,0.06)',
                                        '& .MuiLinearProgress-bar': {
                                          borderRadius: 2,
                                          background: isFull
                                            ? '#ff574e'
                                            : spotsLeft <= 1
                                            ? '#ffa726'
                                            : '#66bb6a',
                                        },
                                      }}
                                    />
                                  </Box>
                                </Stack>
                              </CardContent>
                            </Card>
                          )
                        })}
                      {(teamsListError || !teamsListData?.teams?.filter((t) => !t.description?.includes(FULL_TAG))
                        .length) && (
                        <Box
                          component="div"
                          sx={{
                            textAlign: 'center',
                            py: 6,
                            opacity: 0.6,
                          }}
                        >
                          <GroupsIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} />
                          <Typography color="text.secondary">
                            No teams available right now
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  )}
                </Box>
              )}

              {/* Tab 2: Find Teammates */}
              {tab === 2 && (
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Accepted hackers looking for a team
                  </Typography>
                  {availableUsersLoading ? (
                    <Box component="div" display="flex" justifyContent="center" py={6}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Box
                      component="div"
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          sm: 'repeat(2, 1fr)',
                          md: 'repeat(3, 1fr)',
                        },
                        gap: 2,
                      }}
                    >
                      {availableUsersData?.users.map((availableUser) => (
                        <Card
                          key={availableUser.user_id}
                          variant="outlined"
                          onClick={() => handleOpenModal({ kind: 'available', user: availableUser })}
                          sx={{
                            height: 'auto',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s, transform 0.15s',
                            '&:hover': {
                              borderColor: 'rgba(255,255,255,0.3)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <CardContent sx={{ height: 'auto' }}>
                            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                              <Avatar
                                sx={{
                                  bgcolor: stringToColor(
                                    `${availableUser.first_name}${availableUser.last_name}`
                                  ),
                                  width: 40,
                                  height: 40,
                                  fontSize: '0.9rem',
                                  fontWeight: 600,
                                  flexShrink: 0,
                                }}
                              >
                                {availableUser.first_name[0]}
                                {availableUser.last_name[0]}
                              </Avatar>
                              <Box component="div" sx={{ minWidth: 0 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {availableUser.first_name} {availableUser.last_name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: 'text.secondary', display: 'block' }}
                                >
                                  @{availableUser.username}
                                </Typography>
                              </Box>
                            </Stack>

                            {(availableUser.school || availableUser.program) && (
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mt: 1.5,
                                  color: 'rgba(255,255,255,0.5)',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {[availableUser.school, availableUser.program]
                                  .filter(Boolean)
                                  .join(' \u00B7 ')}
                              </Typography>
                            )}

                            {availableUser.discord_id && (
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mt: 0.5,
                                  color: '#5865F2',
                                  fontFamily: 'monospace',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {availableUser.discord_id}
                              </Typography>
                            )}

                            {availableUser.interests.length > 0 && (
                              <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{ mt: 1.5 }}
                                flexWrap="wrap"
                                useFlexGap
                              >
                                {availableUser.interests.slice(0, 4).map((interest) => (
                                  <Chip
                                    key={interest}
                                    label={interest}
                                    size="small"
                                    sx={{
                                      height: 22,
                                      fontSize: '0.7rem',
                                      mb: 0.5,
                                    }}
                                  />
                                ))}
                                {availableUser.interests.length > 4 && (
                                  <Chip
                                    label={`+${availableUser.interests.length - 4}`}
                                    size="small"
                                    sx={{
                                      height: 22,
                                      fontSize: '0.7rem',
                                      mb: 0.5,
                                      opacity: 0.6,
                                    }}
                                  />
                                )}
                              </Stack>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      {(availableUsersError || !availableUsersData?.users?.length) && (
                        <Box
                          component="div"
                          sx={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            py: 6,
                            opacity: 0.6,
                          }}
                        >
                          <PersonSearchIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} />
                          <Typography color="text.secondary">No available users found</Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Container>
        </Fade>
      )}

      {/* User profile modal */}
      <UserProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        subject={
          modalSubject?.kind === 'available'
            ? {
                kind: 'available',
                user: modalSubject.user,
                canInvite: !!isOwner,
              }
            : modalSubject?.kind === 'teammate'
            ? {
                kind: 'teammate',
                member: modalSubject.member,
                isOwnerViewing: !!isOwner,
                onRemove: handleRemoveMember,
                onTransfer: handleTransferOwnership,
                isRemoving,
                isTransferring,
              }
            : null
        }
      />
    </>
  )
}

export default TeamsPage
