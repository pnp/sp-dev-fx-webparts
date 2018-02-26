using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SharePoint.PnP.SampleRESTAPI.Models
{
  public class MemoryADALCache : TokenCache
  {
    private static Dictionary<String, byte[]> cache = new Dictionary<string, byte[]>();
    private static readonly object FileLock = new object();
    string UserObjectId = string.Empty;
    string CacheId = string.Empty;

    public MemoryADALCache(string userId)
    {
      UserObjectId = userId;
      CacheId = UserObjectId + "_TokenCache";
      this.AfterAccess = AfterAccessNotification;
      this.BeforeAccess = BeforeAccessNotification;

      Load();
    }

    public void Load()
    {
      lock (FileLock)
      {
        this.Deserialize(cache.ContainsKey(CacheId) ? cache[CacheId] : null);
      }
    }

    public void Persist()
    {
      lock (FileLock)
      {
        // reflect changes in the persistent store             
        cache[CacheId] = this.Serialize();

        // once the write operation took place, restore the HasStateChanged bit to false             
        this.HasStateChanged = false;
      }
    }

    // Empties the persistent store.     
    public override void Clear()
    {
      base.Clear();
      cache.Remove(CacheId);
    }

    public override void DeleteItem(TokenCacheItem item)
    {
      base.DeleteItem(item);
      Persist();
    }

    // Triggered right before ADAL needs to access the cache.     
    // Reload the cache from the persistent store in case it changed since the last access.      
    void BeforeAccessNotification(TokenCacheNotificationArgs args)
    {
      Load();
    }

    // Triggered right after ADAL accessed the cache.     
    void AfterAccessNotification(TokenCacheNotificationArgs args)
    {
      // if the access operation resulted in a cache update         
      if (this.HasStateChanged)
      {
        Persist();
      }
    }
  }
}
