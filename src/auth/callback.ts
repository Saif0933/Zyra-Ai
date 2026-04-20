import { CommonActions } from '@react-navigation/native';

/**
 * Utility to handle navigation after a successful login or role selection.
 * This Logic ensures the user is redirected to the correct 'Panel' 
 * based on their selected role.
 */

export const REDIRECT_ROUTES = {
  HEALTH_AI: 'HealthAiMain',
  BEAUTI_CARE: 'BeautiCareMain',
} as const;

export type UserRole = 'healthai' | 'beauticare';

/**
 * Redirects the user to the appropriate panel based on their role.
 * @param navigation navigation object from useNavigation or props
 * @param role 'healthai' or 'beauticare'
 */
export const navigateToRolePanel = (navigation: any, role: string | UserRole) => {
  // Determine target route based on role string
  let targetRoute: string;

  if (role === 'healthai') {
    targetRoute = REDIRECT_ROUTES.HEALTH_AI;
  } else if (role === 'beauticare') {
    targetRoute = REDIRECT_ROUTES.BEAUTI_CARE;
  } else {
    // Fallback to SelectRole if role is unknown
    targetRoute = 'SelectRole';
  }

  // Reset the navigation stack to prevent users from going back to login
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: targetRoute }],
    })
  );
};

/**
 * Example usage in a component:
 * 
 * import { navigateToRolePanel } from '../auth/callback';
 * ...
 * handleLoginSuccess(role) {
 *    navigateToRolePanel(navigation, role);
 * }
 */
