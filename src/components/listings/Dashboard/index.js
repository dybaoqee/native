import {View} from 'react-native'

import * as format from '@/assets/format'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import styles, {iconColor} from './styles'

function Property({title, icon, value}) {
  return (
    <View style={styles.row}>
      <View style={styles.propTitle}>
        <Icon name={icon} color={iconColor} size={22} />
        <Text style={styles.propTitleText}>{title}</Text>
      </View>
      <View style={styles.propValue}>
        <Text style={styles.propValueText}>{value}</Text>
      </View>
    </View>
  )
}

export default function ListingDashboard({
  insertedAt,
  inPersonVisitCount,
  visualisations,
  tourVisualisations,
  favoriteCount,
  matterportCode
}) {
  return (
    <View style={styles.container}>
      <Property
        title="Data de criação"
        icon="calendar-check"
        value={format.date(new Date(insertedAt))}
      />
      <Property title="Visualizações" icon="eye" value={visualisations} />
      {matterportCode && (
        <Property
          title="Visualizações do Tour 3D"
          icon="home-heart"
          value={tourVisualisations}
        />
      )}
      <Property title="Favoritos" icon="heart" value={favoriteCount} />
      <Property
        title="Visitas marcadas"
        icon="calendar-alt"
        value={inPersonVisitCount}
      />
    </View>
  )
}
