import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { archetypeThemes } from '@/constants/archetypeThemes'
import { Planet } from '@/types/Application'

type Props = {
  archetype: Planet
}

const ArchetypeBadge = ({ archetype }: Props) => {
  const theme = archetypeThemes[archetype]

  return (
    <Tooltip title={`${archetype} - ${theme.title}`} placement="right" arrow>
      <Chip
        label={`${theme.emoji} ${theme.title}`}
        size="small"
        sx={{
          backgroundColor: theme.colors.glow,
          border: `1px solid ${theme.colors.primary}`,
          color: '#fff',
          fontWeight: 500,
          fontSize: '0.75rem',
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
    </Tooltip>
  )
}

export default ArchetypeBadge
