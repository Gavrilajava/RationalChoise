Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login", to: "auth#create"
  post '/users', to: "users#create"

  get '/comparsions/:id', to: "comparsions#show"
  get '/comparsions', to: "comparsions#index"
  post '/comparsions', to: "comparsions#create"
  patch '/comparsions/:id', to: "comparsions#update"
  delete '/comparsions/:id', to: "comparsions#destroy"

  post '/items', to: "items#create"
  patch '/items/:id', to: "items#update"
  delete '/items/:id', to: "items#destroy"

  post '/criteria', to: "criteria#create"
  patch '/criteria/:id', to: "criteria#update"
  delete '/criteria/:id', to: "criteria#destroy"

  post '/criteria', to: "criteria#create"
  patch '/criteria/:id', to: "criteria#update"
  delete '/criteria/:id', to: "criteria#destroy"

  post '/values', to: "values#create"
  patch '/values/:id', to: "values#update"
  delete '/values/:id', to: "values#destroy"



end
