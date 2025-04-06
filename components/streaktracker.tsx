import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useAuth } from '../lib/supabase_auth';
import { updateStreak } from '../lib/supabase_crud';
import supabase from '../lib/supabase';

const StreakTracker = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState<number>(0);
  const [last_signed_in, setlast_signed_in] = useState<string>("");

  useEffect(() => {
    if (user) {
      fetchUserStreak(user.id);
    }
  }, [user]);

  const fetchUserStreak = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('streaks, signed_in') 
      .single();

    if (error) {
      console.error('Error fetching user streak ', error);
      return;
    }

    if (data) {
      setStreak(data.streaks || 0);
      setlast_signed_in(data.signed_in); 
      console.log('Last Signed In:', data.signed_in);
    }
  };

  useEffect(() => {
    if (user && last_signed_in) {
      const currentDate = new Date();
      const lastSignInDate = new Date(last_signed_in);

      const oneDayConstant = 24 * 60 * 60;
      const timeDifference = (currentDate.getTime() / 1000) - (lastSignInDate.getTime() / 1000);

      if (timeDifference >= oneDayConstant) {
        const newStreak = streak + 1;
        const loggedIn = currentDate.toISOString(); 

        updateStreak(user.id, newStreak, loggedIn);

        setStreak(newStreak);
        setlast_signed_in(loggedIn); 
      }
    }
  }, [user, last_signed_in, streak]);

  return (
    <Text> {streak} </Text>
  );
};

export default StreakTracker;
