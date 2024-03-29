import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import styles from "../styles/styles";

const initialState = {
  photo: "",
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({
  keyboardHide,
  isKeyboardOpen,
  setIsKeyboardOpen,
}) => {
  const [registrationState, setRegistrationState] = useState(initialState);
  const [secureEntry, setSecureEntry] = useState(true);
  const [inFocus, setInFocus] = useState("");

  const togglePass = () => {
    setSecureEntry(!secureEntry);
  };

  const onRegister = (e) => {
    e.preventDefault();
    console.log(registrationState);
    setRegistrationState(initialState);
  };

  const addUserPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    setRegistrationState((prev) => ({ ...prev, photo: result.assets[0].uri }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View
        style={{
          ...styles.containerRegistration,
          marginBottom: isKeyboardOpen ? -45 : 0,
        }}
      >
        {registrationState.photo.length <= 0 ? (
          <View style={styles.photoPlaceholder}>
            <TouchableOpacity
              style={{ ...styles.photoAdd }}
              onPress={addUserPhoto}
            >
              <Image source={require("../assets/img/img_x_org.png")} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoPlaceholder}>
            <Image
              source={{ uri: registrationState.photo }}
              style={{ width: 120, height: 120, borderRadius: 16 }}
            />
            <TouchableOpacity
              style={{ ...styles.photoAdd }}
              onPress={addUserPhoto}
            >
              <Image
                source={require("../assets/img/img_x.png")}
                style={{
                  transform: [{ rotate: "-45deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput
          placeholder="Логін"
          style={{
            ...styles.input,
            borderColor: inFocus === "name" ? "#ff6c00" : "#E8E8E8",
          }}
          value={registrationState.name}
          onChangeText={(value) =>
            setRegistrationState((prev) => ({ ...prev, name: value }))
          }
          onFocus={() => {
            setIsKeyboardOpen(true);
            setInFocus("name");
          }}
          onBlur={() => {
            setIsKeyboardOpen(false);
            setInFocus("");
          }}
        />

        <TextInput
          placeholder="Адреса електронної пошти"
          style={{
            ...styles.input,
            borderColor: inFocus === "email" ? "#ff6c00" : "#E8E8E8",
          }}
          value={registrationState.email}
          onChangeText={(value) =>
            setRegistrationState((prev) => ({ ...prev, email: value }))
          }
          onFocus={() => {
            setIsKeyboardOpen(true);
            setInFocus("email");
          }}
          onBlur={() => {
            setIsKeyboardOpen(false);
            setInFocus("");
          }}
        />
        <View>
          <TextInput
            placeholder="Пароль"
            style={[
              styles.input,
              {
                ...styles.lastInput,
                marginBottom: isKeyboardOpen ? 32 : 43,
                borderColor: inFocus === "password" ? "#ff6c00" : "#E8E8E8",
              },
            ]}
            value={registrationState.password}
            secureTextEntry={secureEntry}
            onChangeText={(value) =>
              setRegistrationState((prev) => ({ ...prev, password: value }))
            }
            onFocus={() => {
              setIsKeyboardOpen(true);
              setInFocus("password");
            }}
            onBlur={() => {
              setIsKeyboardOpen(false);
              setInFocus("");
            }}
          />
          <Text style={styles.showPassLogin} onPress={togglePass}>
            Показати
          </Text>
        </View>
        {!isKeyboardOpen && (
          <>
            <TouchableOpacity style={styles.buttonMain} onPress={onRegister}>
              <Text style={styles.buttonMainText} onPress={keyboardHide}>
                Зареєструватися
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegistrationScreen;
