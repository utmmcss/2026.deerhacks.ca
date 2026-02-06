import Head from 'next/head'
import { useEffect, useState } from 'react'

import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import {
  useTeamGet,
  useTeamsList,
  useTeamCreate,
  useTeamRequestJoin,
  useTeamRespondJoin,
  useTeamRemoveMember,
  useTeamLeave,
  useTeamTransfer,
  useTeamDisband,
  useTeamHeartbeat,
  useAvailableUsers,
} from '@/hooks/Team'
import Error401Page from '@/pages/401'
import Error404Page from '@/pages/404'
import type { TeamMember } from '@/types/Team'

const TeamsPage = () => {
  const { user, loading, authenticated } = useAuth()
  const isAccepted = ['accepted', 'attended', 'admin', 'moderator'].includes(user?.status ?? '')

  const [tab, setTab] = useState(0)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDescription, setNewTeamDescription] = useState('')
  const [sortBy, setSortBy] = useState('last_active')

  const { data: myTeamData, isLoading: teamLoading } = useTeamGet({ enabled: isAccepted })
  const { data: teamsListData, isLoading: teamsListLoading } = useTeamsList({
    sort: sortBy,
    enabled: isAccepted && tab === 1,
  })
  const { data: availableUsersData, isLoading: availableUsersLoading } = useAvailableUsers({
    enabled: isAccepted && tab === 2,
  })

  const { mutate: createTeam, isLoading: isCreating } = useTeamCreate()
  const { mutate: requestJoin, isLoading: isRequesting } = useTeamRequestJoin()
  const { mutate: respondJoin, isLoading: isResponding } = useTeamRespondJoin()
  const { mutate: removeMember, isLoading: isRemoving } = useTeamRemoveMember()
  const { mutate: leaveTeam, isLoading: isLeaving } = useTeamLeave()
  const { mutate: transferOwnership, isLoading: isTransferring } = useTeamTransfer()
  const { mutate: disbandTeam, isLoading: isDisbanding } = useTeamDisband()
  const { mutate: heartbeat } = useTeamHeartbeat()

  const myTeam = myTeamData?.team
  const isOwner = myTeam && user && myTeam.owner_discord_id === user.discord_id

  // Heartbeat every 10 minutes when on a team
  useEffect(() => {
    if (!myTeam) return
    const interval = setInterval(() => heartbeat(undefined), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [myTeam, heartbeat])

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

  if (!loading && !authenticated) return <Error401Page />
  if (!loading && !isAccepted) return <Error404Page />

  const joinedMembers = myTeam?.members.filter((m) => m.state === 'joined') ?? []
  const pendingMembers = myTeam?.members.filter((m) => m.state === 'pending') ?? []

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
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start', py: 4 }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography variant="h1" gutterBottom>
              Teams
            </Typography>

            {teamLoading ? (
              <Box component="div" display="flex" justifyContent="center" py={8}>
                <CircularProgress />
              </Box>
            ) : myTeam ? (
              // User has a team - show team details
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {myTeam.name}
                  </Typography>
                  {myTeam.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {myTeam.description}
                    </Typography>
                  )}

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Members ({joinedMembers.length})
                  </Typography>
                  <List dense>
                    {joinedMembers.map((member: TeamMember) => (
                      <ListItem
                        key={member.user_id}
                        secondaryAction={
                          isOwner && !member.is_owner ? (
                            <Stack direction="row" spacing={1}>
                              <Button
                                size="small"
                                onClick={() => handleTransferOwnership(member.user_id)}
                                disabled={isTransferring}
                              >
                                Make Owner
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleRemoveMember(member.user_id)}
                                disabled={isRemoving}
                              >
                                Remove
                              </Button>
                            </Stack>
                          ) : null
                        }
                      >
                        <ListItemText
                          primary={
                            <>
                              {member.first_name} {member.last_name}
                              {member.is_owner && (
                                <Chip label="Owner" size="small" color="primary" sx={{ ml: 1 }} />
                              )}
                            </>
                          }
                          secondary={`@${member.username}`}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {isOwner && pendingMembers.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Pending Requests ({pendingMembers.length})
                      </Typography>
                      <List dense>
                        {pendingMembers.map((member: TeamMember) => (
                          <ListItem
                            key={member.user_id}
                            secondaryAction={
                              <Stack direction="row" spacing={1}>
                                <Button
                                  size="small"
                                  color="success"
                                  onClick={() => handleRespondJoin(member.user_id, 'approve')}
                                  disabled={isResponding}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() => handleRespondJoin(member.user_id, 'reject')}
                                  disabled={isResponding}
                                >
                                  Reject
                                </Button>
                              </Stack>
                            }
                          >
                            <ListItemText
                              primary={`${member.first_name} ${member.last_name}`}
                              secondary={`@${member.username}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" spacing={2}>
                    {isOwner ? (
                      joinedMembers.length === 1 ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleDisbandTeam}
                          disabled={isDisbanding}
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
                        onClick={handleLeaveTeam}
                        disabled={isLeaving}
                      >
                        Leave Team
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              // User has no team - show create form
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Create a Team
                  </Typography>
                  <Stack spacing={2} sx={{ maxWidth: 400 }}>
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
                    >
                      Create Team
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Tabs for Browse Teams and Available Users */}
            <div style={{ borderBottom: '1px solid', borderColor: 'divider', marginBottom: 16 }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab icon={<GroupsIcon />} label="My Team" />
                <Tab icon={<GroupsIcon />} label="Browse Teams" />
                <Tab icon={<PersonSearchIcon />} label="Find Teammates" />
              </Tabs>
            </div>

            {tab === 1 && (
              <div>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
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
                  <Box component="div" display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Max team size: {teamsListData?.max_size}
                    </Typography>
                    <Stack spacing={2}>
                      {teamsListData?.teams.map((team) => (
                        <Card key={team.id} variant="outlined">
                          <CardContent>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <div>
                                <Typography variant="h6">{team.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {team.member_count}/{teamsListData.max_size} members
                                </Typography>
                              </div>
                              {!myTeam && team.member_count < teamsListData.max_size && (
                                <Button
                                  size="small"
                                  onClick={() => handleRequestJoin(team.id)}
                                  disabled={isRequesting}
                                >
                                  Request to Join
                                </Button>
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                      {teamsListData?.teams.length === 0 && (
                        <Typography color="text.secondary">No teams found</Typography>
                      )}
                    </Stack>
                  </>
                )}
              </div>
            )}

            {tab === 2 && (
              <div>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Accepted hackers looking for a team
                </Typography>
                {availableUsersLoading ? (
                  <Box component="div" display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {availableUsersData?.users.map((availableUser) => (
                      <Card key={availableUser.user_id} variant="outlined">
                        <CardContent>
                          <Typography variant="h6">
                            {availableUser.first_name} {availableUser.last_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{availableUser.username}
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontFamily: 'monospace' }}>
                            Discord: {availableUser.discord_id}
                          </Typography>
                          {availableUser.school && (
                            <Typography variant="body2">{availableUser.school}</Typography>
                          )}
                          {availableUser.interests.length > 0 && (
                            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap">
                              {availableUser.interests.map((interest) => (
                                <Chip key={interest} label={interest} size="small" />
                              ))}
                            </Stack>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    {availableUsersData?.users.length === 0 && (
                      <Typography color="text.secondary">No available users found</Typography>
                    )}
                  </Stack>
                )}
              </div>
            )}
          </Container>
        </Fade>
      )}
    </>
  )
}

export default TeamsPage
