/**
 * Detects the deployment type (cloud or self-hosted)
 */
export function getDeploymentType(): 'cloud' | 'self-hosted' {
  return (process.env.DEPLOYMENT_TYPE as 'cloud' | 'self-hosted') || 'cloud'
}

/**
 * Checks if the app is running in cloud mode
 */
export function isCloudDeployment(): boolean {
  return getDeploymentType() === 'cloud'
}

/**
 * Checks if the app is running in self-hosted mode
 */
export function isSelfHostedDeployment(): boolean {
  return getDeploymentType() === 'self-hosted'
}

