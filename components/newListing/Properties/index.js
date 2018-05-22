import Form from '@/components/shared/Form/Form'
import Dropdown from '@/components/shared/Form/Dropdown'
import TextInput from '@/components/shared/Form/TextInput'
import NumberPicker from './NumberPicker'
import styles from './styles'

export default function ListingPropertiesForm({onSubmit}) {
  return (
    <Form style={styles.container} onSubmit={onSubmit}>
      <Dropdown
        name="type"
        placeholder="Tipo de imóvel"
        options={[
          {value: 'Apartamento', label: 'Apartamento'},
          {value: 'Casa', label: 'Casa'},
          {value: 'Cobertura', label: 'Cobertura'}
        ]}
      />
      <NumberPicker label="Quartos" name="rooms" />
      <NumberPicker label="Banheiros" name="bathrooms" />
      <NumberPicker label="Vagas de garagem" name="garage_spots" />
      <TextInput
        name="floor"
        placeholder="Andar"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="maintenance_fee"
      />
      <TextInput
        name="maintenance_fee"
        placeholder="Condomínio (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="iptu"
      />
      <TextInput
        name="iptu"
        placeholder="IPTU (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="description"
      />
      <TextInput multiline name="description" placeholder="Descrição" />
    </Form>
  )
}
