import { StyleSheet, Dimensions } from "react-native"

const { height } = Dimensions.get("window");

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    lineHeight: 80,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    color: "black",
    width: 280,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1.5,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 2.5
  },
  button: {
    width: 280,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderWidth: 1.5,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 2.5

  },
  placeholder: {
    paddingVertical: height * 0.03,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  returnImage: {
    height: 30,
    width: 30,
  },
  returnButton: {
    position: "absolute",
    top: 60,
    left: 25,
    padding: 3,
  }
});

export default LoginStyles;
