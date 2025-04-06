import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function MainHome() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Profile Section */}
      <View className="flex-row items-center justify-between mb-6">
        <Image
          source={require('../../assets/images/profile.jpg')}
          className="w-12 h-12 rounded-full"
        />
        <Text className="text-xl font-semibold">Welcome to BabyCry Home!</Text>
      </View>

      {/* Feature Buttons */}
      <View className="space-y-4">
        <Link href="/main/identify-cry" asChild>
          <TouchableOpacity className="bg-pink-100 p-4 rounded-2xl shadow">
            <Text className="text-lg font-medium text-pink-700">
              🎤 Identify Crying using Machine Learning & Suggest Actions
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/main/bmi" asChild>
          <TouchableOpacity className="bg-green-100 p-4 rounded-2xl shadow">
            <Text className="text-lg font-medium text-green-700">
              🥗 BMI Calculator & Food Chart
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/main/reminders" asChild>
          <TouchableOpacity className="bg-blue-100 p-4 rounded-2xl shadow">
            <Text className="text-lg font-medium text-blue-700">
              💊 Health Guidelines & Reminders (Medicine, Vaccines)
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/main/teddy-chat" asChild>
          <TouchableOpacity className="bg-yellow-100 p-4 rounded-2xl shadow">
            <Text className="text-lg font-medium text-yellow-700">
              🧸 Teddy Chat Feature (Comfort for Babies When Alone)
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
