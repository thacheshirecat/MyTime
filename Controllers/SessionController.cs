using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTime.Models;

namespace MyTime.Controllers
{
  [Route("api/[controller]")]
  public class SessionController : Controller
  {
    [HttpPost("[action]")]
    public IDictionary<string, string> StartSession([FromBody] MTUser data)
    {
      MTUser founduser = MTUser.getUserByName(data.getUserName());
      founduser.setSessionStartDate(data.getSessionStartDate());
      founduser.setNormalizedStartTime(data.getNormalizedStartTime());
      founduser.setSessionStartTime(data.getSessionStartTime());

      MTUser.startNewSession(founduser.getUserId(), founduser.getSessionStartDate(), founduser.getNormalizedStartTime(), founduser.getSessionStartTime());

      IDictionary<string, string> user = new Dictionary<string, string>();
      user.Add(new KeyValuePair<string, string>("username", founduser.getUserName()));
      user.Add(new KeyValuePair<string, string>("password", founduser.getPassword()));
      user.Add(new KeyValuePair<string, string>("email", founduser.getEmail()));
      user.Add(new KeyValuePair<string, string>("sessionstartdate", founduser.getSessionStartDate()));
      user.Add(new KeyValuePair<string, string>("normalizedstarttime", founduser.getNormalizedStartTime()));
      user.Add(new KeyValuePair<string, string>("sessionstarttime", founduser.getSessionStartTime()));
      user.Add(new KeyValuePair<string, string>("userid", founduser.getUserId().ToString()));

      return user;
    }
  }
}
