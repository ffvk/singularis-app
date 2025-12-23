import { View, Button, TextInput, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { loginWithEmailAPI } from "../services/authApi";
import { useThemeCustom } from "../../../theme/ThemeProviderCustom";
import { getAllOrganizations } from "../../../service/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";


export default function LoginWithEmailForm() {
  const navigation = useNavigation();
  const { login, setRealm } = useAuthContext(); 
  const { theme } = useThemeCustom();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [organizations, setOrganizations] = useState<{ label: string; value: string; logo?: string }[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [orgLoading, setOrgLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginWithEmailAPI,
    onSuccess: (response) => {
       const accessToken = response?.data?.tokens?.access_token;
    const role = response?.data?.data?.user?.primaryRole;
    const realm = response?.data?.data?.user?.realm;

      login(accessToken,role, realm);
      Toast.show({type: "success",text1: "Login successful"});

    },
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setOrgLoading(true);
        const response = await getAllOrganizations();
        const mappedData = response?.data?.data.map((org: any) => ({
          label: org.displayName || org.key,
          value: org.key,
          // logo: ORG_LOGO_MAP[org.key] || "",
        }));
        setOrganizations(mappedData);
      } catch (error) {
        console.error("Failed to fetch organizations", error);
      } finally {
        setOrgLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

useEffect(() => {
  if (selectedOrg) {
    AsyncStorage.setItem("realm", selectedOrg);
     setRealm(selectedOrg);
  }
}, [selectedOrg]);



  // Disable all inputs/buttons until org is selected
  const isDisabled = !selectedOrg;

  return (

      <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      if (open) setOpen(false);
    }}
  >


    <View style={{ padding: theme.spacing(2), backgroundColor: theme.colors.background, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: theme.typography.h1, fontWeight: "600", color: theme.colors.textPrimary, marginBottom: theme.spacing(2), textAlign: "center" }}>
        Login
      </Text>


            {/* Organization Dropdown */}
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedOrg}
        setValue={setSelectedOrg}
        items={organizations}
        placeholder={orgLoading ? "Loading organizations..." : "Select organization"}
        searchable={true}
        loading={orgLoading}
        style={{
          borderColor: theme.colors.border,
          marginBottom: theme.spacing(2),
          backgroundColor: theme.colors.background,
        }}
        dropDownContainerStyle={{
          borderColor: theme.colors.border,
        }}
      />


              <View style={{ opacity: isDisabled ? 0.5 : 1, pointerEvents: isDisabled ? "none" : "auto" }}>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing(1.5),
          marginBottom: theme.spacing(2),
          color: theme.colors.textPrimary,
        }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing(1.5),
          marginBottom: theme.spacing(2),
          color: theme.colors.textPrimary,
        }}
      />



<TouchableOpacity
  onPress={() => navigation.navigate("ForgotPassword" as never)}
>
  <Text
    style={{
      color: theme.colors.primary,
      textDecorationLine: "underline",
      fontSize: theme.typography.caption,
      textAlign: "right",
      marginTop: theme.spacing(1),
                marginBottom: theme.spacing(3),

    }}
  >
    Forgot Password?
  </Text>
</TouchableOpacity>


      <Button
        title={isPending ? "Logging in..." : "Login"}

        onPress={() => {
          if (!selectedOrg) {
            alert("Please select an organization");
            return;
          }
          mutate({ email, password, realm: selectedOrg });
        }}
        color={theme.colors.primary}
        disabled={isPending || isDisabled}
        
      />
    </View>


    </View>


  </TouchableWithoutFeedback>

  );
}
