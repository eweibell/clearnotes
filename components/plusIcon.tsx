import { IconButton } from 'react-native-paper';

const PlusButton = () => (
  <IconButton
    icon="plus"
    iconColor={"black"}
    size={100}
    onPress={() => console.log('Pressed')}
  />
);

export default PlusButton