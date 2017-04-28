Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "pages#home"

  namespace :api do
  	namespace :v1 do
  		get "/people", to: "people#index"
  	end
  end
end
