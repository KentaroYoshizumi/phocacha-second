Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :shops do
        resources :photos, only: %i[index]
      end
      resources :line_photos, only: %i[index create]
      put 'line_photos/replace', to: 'line_photos#replace'
      resources :orders, only: %i[create]
    end
  end
  
end
