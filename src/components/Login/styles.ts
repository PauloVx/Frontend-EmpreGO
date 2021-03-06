import { StyleSheet } from 'react-native';

import { globalColors } from '../../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradientContainer: {
    flex: 1
  },

  imageView: {
    width: '100%',
    height: '50%',
    padding: 40,
  },

  image: {
    width: '100%',
    height: '100%'
  },

  title: {
    color: '#FFF',
    fontWeight: 'bold',

    fontSize: 20,
    marginBottom: 15
  },

  fieldsView: {
    width: '90%',
    height: '25%',

    marginBottom: 40,

    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  warningText: {
    color: '#FFF',
    fontWeight: 'bold',
    padding: 5
  },

  btnsView: {
    width: '90%',
    height: '17%',

    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  btnGO: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50
  },

  btnGoText: {
    fontWeight: 'bold',
    color: '#EF7562',
    fontSize: 15
  },

  btnSignUp: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnSignUpText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  formField: {
    width: '100%',
    height: '25%',
    borderRadius: 50,
    textAlign: 'center',

    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 'bold',
    fontSize: 15
  },

  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '25%',
    borderRadius: 50,

    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingRight: 20
  },

  iconTextInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    paddingHorizontal: 20
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: '17%'
  },

  forgotPasswordBtn: {
    height: '10%',
    alignSelf: 'center',
    marginTop: 10,
  },

  forgotPasswordBtnText: {
    fontWeight: 'bold',
    color: '#FFF'
  }
});