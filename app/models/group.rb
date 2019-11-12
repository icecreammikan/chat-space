class Group < ApplicationRecord
  has_many :messages
  has_many :users,  through:  :users_group
  has_many :users_group
  validates :name, presence: true, uniqueness: true
end
