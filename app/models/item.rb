class Item < ActiveRecord::Base
  attr_accessible :res
  before_validation :parse_response

  def clean
    begin
      yield
    rescue
      nil
    end
  end

  def parse_response
    @ASIN = self.clean { res.get("ASIN") }
    @detail_page_url = self.clean { res.get("DetailPageURL") }
    @large_image_url = self.clean { res.get_element("LargeImage").get("URL") }
    @small_image_url = self.clean { res.get_element("SmallImage").get("URL") }
    @medium_image_url = self.clean { res.get_element("MediumImage").get("URL") }
    @description = self.clean { res.get_element("EditorialReviews").get_element("EditorialReview").get("Content") }

    item_attributes = self.clean { res.get_element("ItemAttributes") }
    @category = self.clean { item_attributes.get("Binding") }
    @title = self.clean { item_attributes.get("Title") }

    @price = self.clean { item_attributes.get_element("ListPrice").get("Amount") }
    @currency = self.clean { item_attributes.get_element("ListPrice").get("CurrencyCode") }

    if @price == nil
      lowest_new_price = res.get_element("OfferSummary").get_element("LowestNewPrice")
      @price = self.clean { lowest_new_price.get("Amount") }
      @currency = self.clean { lowest_new_price.get("CurrencyCode") }
    end
  end
end
