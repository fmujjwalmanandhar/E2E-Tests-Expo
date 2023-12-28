import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [loginData, setloginData] = useState({
    email: null,
    password: null,
  });

  const _onChange = (type) => (text) => {
    switch (type) {
      case "EMAIL":
        setloginData((prevState) => {
          return {
            ...prevState,
            email: text,
          };
        });
        break;

      case "PASSWORD":
        setloginData((prevState) => {
          return {
            ...prevState,
            password: text,
          };
        });
        break;

      default:
        break;
    }
  };

  const _onPress = () => {
    setClicked((prevState) => !prevState);
  };

  const isLoginDisable = !loginData.email && !loginData.password;

  return (
    <View style={styles.container}>
      {!clicked && (
        <View style={styles.flex}>
          <Text style={styles.text}>Please Enter Your Email</Text>
          <TextInput
            testID={"email"}
            style={styles.input}
            onChangeText={_onChange("EMAIL")}
            value={loginData.email}
            placeholder="Email"
            keyboardType={"email-address"}
          />
          <Text style={styles.text}>Please Enter Your Password</Text>

          <TextInput
            testID={"password"}
            style={styles.input}
            onChangeText={_onChange("PASSWORD")}
            value={loginData.password}
            placeholder="Password"
            keyboardType="visible-password"
          />

          <Pressable
            testID="login-button"
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#4630EB" : "#4E6CFF",
              },
              styles.button,
              isLoginDisable && styles.disableButtonStyle,
            ]}
            disabled={isLoginDisable}
            onPress={_onPress}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>
      )}
      {clicked && (
        <View style={styles.flex}>
          <Text style={styles.hi}>Welcome!</Text>
          <Pressable
            testID="go-back-button"
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#4630EB" : "#4E6CFF",
              },
              styles.button,
            ]}
            onPress={_onPress}
          >
            <Text style={styles.loginText}>Go Back</Text>
          </Pressable>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  hi: {
    fontSize: 30,
    color: "#4E6CFF",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#222222",
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginVertical: 16,
    borderWidth: 1,
    padding: 10,
    borderColor: "#AAAAAA",
  },
  disableButtonStyle: {
    backgroundColor: "#B4C1FF",
  },
});
