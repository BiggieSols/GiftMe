class Item < ActiveRecord::Base
  has_many :wanted_user_items
  has_many :wanting_users, through: :wanted_user_items, source: :user

  has_many :unwanted_user_items
  has_many :unwanting_user, through: :unwanted_user_items, source: :user

  has_many :user_item_recommendations, conditions: proc {["to_user_id = ?", User.current_user.id] }

  has_many :recommending_users, through: :user_item_recommendations, source: :user_from

  attr_accessible :res, :asin, :detail_page_url, :large_image_url, :small_image_url, 
                        :medium_image_url, :description, :attributes, :category,
                        :title, :price, :currency

  attr_accessor :res

  # before_validation :parse_response

  def clean
    begin
      yield
    rescue
      nil
    end
  end

  def shortened_title
    self.title.length > 50 ? self.title[0..50].rstrip + "..." : self.title
  end

  
  def parse_response
    self.asin = self.clean { res.get("ASIN") }
    self.detail_page_url = self.clean { res.get("DetailPageURL") }
    self.large_image_url = self.clean { res.get_element("LargeImage").get("URL") }
    self.small_image_url = self.clean { res.get_element("SmallImage").get("URL") }
    self.medium_image_url = self.clean { res.get_element("MediumImage").get("URL") }
    self.description = self.clean { res.get_element("EditorialReviews").get_element("EditorialReview").get("Content") }

    item_attributes = self.clean { res.get_element("ItemAttributes") }
    self.category = self.clean { item_attributes.get("Binding").downcase } || "misc."
    self.title = self.clean { item_attributes.get("Title") }[0..254]

    self.price = self.clean { item_attributes.get_element("ListPrice").get("Amount") }
    self.currency = self.clean { item_attributes.get_element("ListPrice").get("CurrencyCode") }

    if self.price == nil
      lowest_new_price =  self.clean { res.get_element("OfferSummary").get_element("LowestNewPrice") }
      self.price = self.clean { lowest_new_price.get("Amount") }
      self.currency = self.clean { lowest_new_price.get("CurrencyCode") }
    end

    if ["paperback", "hardcover"].include? self.category
      self.category = "books"
    end
  end

end
