json.text @message.text
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.group_id @message.group_id
json.user_id @message.user_id
json.id @message.id
json.user_name @message.user.name