import OAuthUser from "../models/oAuthUserModel"


export default async function saveOAuthUser(details: any) {
  const id = details?.id
  const name = details?.name
  const email = details?.email

  if (!id || !name || !email) return

  const user = await OAuthUser.findOne({email})
  if (user) {
    user.id = id
    user.name = name
    await user.save()
    return user
  }
  
  const newUser = new OAuthUser({id, name, email})
  const savedUser = await newUser.save()
  return savedUser
}