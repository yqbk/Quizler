import { AmplifyTheme } from 'aws-amplify-react-native'

const deepSquidInk = '#152939'

const ButtonStyle = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: deepSquidInk,
})

const DisabledButtonStyle = Object.assign({}, AmplifyTheme.buttonDisabled, {
  backgroundColor: deepSquidInk,
  opacity: 0.5,
})

const sectionFooterLink = Object.assign({}, AmplifyTheme.buttonDisabled, {
  alignItems: 'baseline',
  backgroundColor: 'white',
  color: deepSquidInk,
  textAlign: 'center',
})

export const MyTheme = Object.assign({}, AmplifyTheme, {
  button: ButtonStyle,
  buttonDisabled: DisabledButtonStyle,
  sectionFooterLink,
})
