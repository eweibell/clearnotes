import { IconButton } from 'react-native-paper';

const MyComponent = () => (
  <IconButton
    icon="plus"
    iconColor={"black"}
    size={100}
    onPress={() => console.log('Pressed')}
  />
);

export default MyComponent